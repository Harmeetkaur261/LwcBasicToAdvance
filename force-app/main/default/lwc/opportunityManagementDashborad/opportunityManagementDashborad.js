import { LightningElement,wire } from 'lwc';
import getOpportunityRecord from '@salesforce/apex/OpportunityDetail.getOpportunityRecord';
import deleteOpportunity from '@salesforce/apex/OpportunityDetail.deleteOpportunity';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getfindSomeOfAmount from '@salesforce/apex/OpportunityDetail.getfindSomeOfAmount';
import { updateRecord } from 'lightning/uiRecordApi';



const columns = [
    { label: 'Opportunity Name', fieldName: 'Name', editable : true},
    { label: 'Stage', fieldName: 'StageName', editable : true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', editable : true },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date',    editable : true },
     {
    type: 'button',
    typeAttributes: {
        label: 'Edit',
        name: 'edit',
        variant: 'brand'
        
    }
},
{
    type: 'button',
    typeAttributes: {
        label: 'Delete',
        name: 'delete',
        variant: 'destructive'
    }
}

];
export default class OpportunityManagementDashborad extends NavigationMixin(LightningElement) {
    columns = columns;
    data=[];
    fullData=[];
    error;
    totalAmount=0;
    selectedStage="None";
    defaultValues=[];
@wire(getOpportunityRecord) 
opportunityData({error, data}){
    if(data){
        this.data = data;
        this.fullData=data;
    }
    if(error){
        console.error('Error fetching opportunity records:', error);
    }   
}
get stageOptions(){
    return [
        { label:"Prospecting", value:"Prospecting" },
        { label:"Qualification", value:"Qualification" },
        { label:"Closed Won", value:"Closed Won" },
        { label:"Closed Lost", value:"Closed Lost" } // ✅ fixed
    ];
}

handleStageChange(event){
    this.selectedStage = event.detail.value;
        if (this.selectedStage) {
        this.data = this.fullData.filter(
            record => record.StageName === this.selectedStage
        );
    } else {
        this.data = [...this.fullData];
    }
}
   handleRowAction(event) {

   const action = event.detail.action;
            const row = event.detail.row;
            switch (action.name) {
                case 'edit':
                  this.editOpportunity(row.Id); 
                    break;
                case 'delete':
                    this.deleteOpportunity(row.Id);
                    break;
     }
    }
editOpportunity(Id) {
     const defaultValues = encodeDefaultFieldValues({
            Id:Id
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        }); 

     }
 async  deleteOpportunity(Id){
    try {
        await deleteOpportunity({oppId:Id});
        this.showToast('Success','Opportunity Deleted Successfully','success');
        this.opportunityData(); // Refresh the data after deletion
    } catch (error) {
        this.showToast('Error',error.body.message,'error');
    }
   }
   showToast(inputTitle, inputMessage, inputVariant) {
        const event = new ShowToastEvent({
            title: inputTitle,
            message: inputMessage,
            variant: inputVariant
        }); 
        this.dispatchEvent(event);
    }
    connectedCallback() {
      this.loadTotalAmount();
    }
    async loadTotalAmount() {
        try {
             this.totalAmount = await getfindSomeOfAmount();
          
        } catch (error) {
            console.error('Error fetching total amount:', error);
        }
    }
    async handleSave(event) {
        let updatedFields = event.detail.draftValues;
        let mappedArray = updatedFields.map(item => {
            let fieldInput={...item}
            return {
                fields:fieldInput
            };
        });
        console.log('Mapped Array:', mappedArray);
        this.defaultValues=[];
        let updateArrayPromise=mappedArray.map(item => updateRecord(item));
        Promise.all(updateArrayPromise)
        .then(result => {
            this.showToast('Success','Opportunity Updated Successfully','success');
            this.opportunityData(); // Refresh the data after update
            this.draftValues = [];
        })
        .catch(error => {
            this.showToast('Error',error.body.message,'error');
        });
    }
}