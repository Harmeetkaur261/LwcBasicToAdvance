import { LightningElement, wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/AccountDetailsController.getAccountDetails';
import { publish, MessageContext } from 'lightning/messageService';
import accountDetails from '@salesforce/messageChannel/accountDetails__c';

const columns = [
    { label: 'Account Name', fieldName:'nameUrl',type: 'url',
        typeAttributes: {
            label:{ fieldName:'accountName' },
            target:'_blank'
        }
     },
    { label: 'Industry', fieldName: 'accountIndustry' },
    { label: 'Type', fieldName:'accountType', type: 'text' },
    { label: 'Opportunity Count', fieldName: 'opportunityCount' }
];  
export default class AccountDetailsLMS extends LightningElement {
    columns = columns;
   
 @wire(getAccountDetails)
 accountDetails;
  @wire(MessageContext)
    messageContext;


 handleRowSelection(event){
    const selectedRows = event.detail.selectedRows;
    const selectedRowId=selectedRows[0].accountId;
    console.log('Selected Row Ids: ', selectedRowId);
    const payload ={recordId:selectedRowId };
    publish(this.messageContext, accountDetails , payload);
   
 }
}