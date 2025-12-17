import { LightningElement,wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountWithCaseAndContact.getAccount';
import getRelatedRecords from '@salesforce/apex/AccountWithCaseAndContact.getRelatedRecords';
  

export default class AccountWithCaseWithContact extends LightningElement {
   accountOptions=[];
   selectedAccountId;
    error;
    cases=[];
    contacts=[];
casesList = [
    { label: 'Case Id', fieldName: 'Id', type: 'text' },
    { label: 'Subject', fieldName: 'Subject', type: 'text' },
    { label: 'Status', fieldName: 'Status', type: 'text' }
];

contactsList = [
    { label: 'Contact Id', fieldName: 'Id', type: 'text' },
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' }
];


    @wire(getAccount)
    wiredAccounts({ data, error }) {
        if (data){
            this.accountOptions=data.map(acc =>({
                label:acc.Name,
                value:acc.Id
            }));
            this.error = undefined;
            console.log('Account Options:', this.accountOptions);
        } else if (error) {
            this.error = error;
            this.accountOptions =undefined;
            console.error(error);
        }
    }

   async handleChange(event) {
        this.selectedAccountId = event.detail.value;
       console.log('Selected Account Id:', this.selectedAccountId);

        try {
            const relatedRecords = await getRelatedRecords({
                accountId:this.selectedAccountId
            });

            this.cases = relatedRecords.caseList || [];
            this.contacts = relatedRecords.contactList || [];
            this.error = undefined;
            console.log('Cases:', this.cases);
            console.log('Contacts:', this.contacts);

        } catch (error) {
            this.error = error;
            this.cases = [];
            this.contacts = [];
            console.error(error);
        }
    }
}

