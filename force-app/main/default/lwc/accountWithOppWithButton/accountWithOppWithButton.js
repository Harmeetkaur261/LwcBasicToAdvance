import { LightningElement,wire } from 'lwc';
import getAccountOpp from '@salesforce/apex/AccountRecordsWithContactButton.getAccountOpp';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteRecords from '@salesforce/apex/AccountRecordsWithContactButton.deleteRecords';

const columns = [
    { label:'Account Name', fieldName:'urlName', type:'url',
    typeAttributes: {label: { fieldName:'name' }, target: '_blank' }
     },
   
    { label: 'Type', fieldName: 'type', type: 'text' },
    { label: 'Country', fieldName: 'country', type: 'text' },
    { label: 'Opp Size', fieldName: 'OpportunityCount', type: 'number' },
    {
        type: 'button',
        typeAttributes: {
            label: 'Create Contacts',
            name: 'Create contacts',
            variant:'brand',
            iconPosition:'left'
        }
        
    },{
        type: 'button',
        typeAttributes: {
            label: 'Delete Account',
            name: 'Delete Account',
            variant:'destructive',
            iconPosition:'left'
        }
        
    }
];

export default class AccountWithOppWithButton extends NavigationMixin(LightningElement) {
    columns = columns;
  
    @wire (getAccountOpp) 
    accountOpp
    get hasData(){
        return this.accountOpp.data?true:false;
    }
    
    handleRowAction(event) {
            const action = event.detail.action;
            const row = event.detail.row;
            switch (action.name) {
                case 'Create contacts':
                  this.createContacts(row.accountId); 
                    break;
                case 'Delete Account':
                    this.deleteAccount(row.accountId);
                    break;
     }
     
    }
    createContacts(accountId){
        const defaultValues = encodeDefaultFieldValues({
            AccountId: accountId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        }); 

     }
   async  deleteAccount(accountId){
    try {
        await deleteRecords({accountId:accountId});
        this.showToast('Success','Account Deleted Successfully','success');
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
}