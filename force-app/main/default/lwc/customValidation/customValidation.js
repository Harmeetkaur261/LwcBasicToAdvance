import { LightningElement ,wire } from 'lwc';
import getAccountRecord from '@salesforce/apex/AccountRecord.getAccountRecord';
const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Website', fieldName: 'Website', type: 'url' }

   
];

export default class CustomValidation extends LightningElement {
    data = [];
    columns = columns;
    @wire (getAccountRecord) 
    accountRecords({error,data}){
        if(data){
            this.data=data;
            console.log('Original Data => ' + JSON.stringify(data));

            this.data = data.filter(acc => acc.AnnualRevenue > 50000 
                && acc.Website && acc.Website.trim() !== ''
            
            );

            console.log('Filtered Data => ' + JSON.stringify(this.data));
        }
        if(error){
            console.error('error==>'+JSON.stringify(error));
        }
    }

 
}