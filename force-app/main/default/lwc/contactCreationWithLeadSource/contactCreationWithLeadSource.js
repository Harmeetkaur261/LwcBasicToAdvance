import { LightningElement, track } from 'lwc';
import getLeadSourceValues 
    from '@salesforce/apex/ContactCreationController.getLeadSourceValues';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreationWithLeadSource extends LightningElement {
    leadSourceValue;
    selectedAccountId;
    @track accountIdList = [];

   handleLeadSource(event) {
        this.leadSourceValue = event.detail.value;
        console.log('Selected Lead Source:', this.leadSourceValue);
        this.fetchFilterAccount();
       
    }

    fetchFilterAccount() {
        getLeadSourceValues({leadSource:this.leadSourceValue})
            .then(result => {
                this.accountIdList=result ;
               console.log('Account Id List:',JSON.stringify(this.accountIdList)
                );
            })
            .catch(error => {
                console.error('Error fetching account Ids:', error);
                this.accountIdList = [];
            });
    }
   get accountFilter() {
    return this.accountIdList && this.accountIdList.length > 0
        ? {
            criteria: [
                {
                    fieldPath: 'Id',
                    operator: 'in',
                    value: this.accountIdList
                }
            ]
        }
        : null;
}
    handleChangeAccount(event){
        this.selectedAccountId = event.detail.recordId;
        console.log('Selected Account Id:', this.selectedAccountId);
    }

    selectedAccountId(){
        return this.selectedAccountId;
    }
    handleSubmit(event){
        event.preventDefault(); // Prevent default submission
        const recordForm=this.template.querySelector('lightning-record-edit-form');
        const fields={};
        const inputFileds=recordForm.querySelectorAll('lightning-input-field');
        inputFileds.forEach(field=>{
            fields[field.fieldName]=field.value;
        });
        fields['AccountId']=this.selectedAccountId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        
        
       
    }
    handleSuccess(event){
        console.log('Contact created successfully ');
      this.dispatchEvent(new ShowToastEvent({
          title:"Success",
          message:"Contact has been created.",
          variant:"success"
      }));
    }
    handleError(event){
        console.error('Error creating contact:', event.detail.error);
        this.dispatchEvent(new ShowToastEvent({
            title: "Error ",
            message: "message",
            variant: "error"
        }));
    }
}
