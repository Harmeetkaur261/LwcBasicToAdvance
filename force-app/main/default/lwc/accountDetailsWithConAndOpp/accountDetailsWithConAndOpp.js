import { LightningElement,wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/AccountDetails.getAccountDetails';
import getRelatedRecords from '@salesforce/apex/AccountDetails.getRelatedRecords'
const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    {label:'Account Id', fieldName:'Id'},
     {
        type: 'button',
        typeAttributes: {
            label: 'Account Detail',
            name: 'view',
            variant: 'brand'
        }
    }
    
];
export default class AccountDetailsWithConAndOpp extends LightningElement {
 accountData=[];
columns=columns;
contacts = [];
opportunities = [];

    contactColumns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email' }
    ];

    oppColumns = [
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' ,cellAttributes: { alignment: 'left' }},
        { label: 'Lead Source', fieldName: 'LeadSource' }
    ];
@wire(getAccountDetails)
accountDetails({error,data}){
    if(data){
        this.accountData = data;
        console.log('Account Details: ',data);
    }else if(error){
        console.error('Error fetching account details: ',error);
    }   
}
 handleRowClick(event) {
   const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'view') {

            getRelatedRecords({ accountId: row.Id })
                .then(result => {
                    this.contacts = result.contactList || [];
                    this.opportunities = result.opportunityList || [];
                })
                .catch(error => {
                    console.error('Apex Error:', error);
                });
        }
    }
}

