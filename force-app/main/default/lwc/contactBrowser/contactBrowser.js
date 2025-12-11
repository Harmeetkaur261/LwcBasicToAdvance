import { LightningElement,wire} from 'lwc';
import getContacts from '@salesforce/apex/contactBrowserController.getContacts';
export default class ContactBrowser extends LightningElement {
    selectedAccount="";
    selectedIndustry="";
   
    @wire(getContacts,{accountId:"$selectedAccount",industry:"$selectedIndustry"})
    contacts({data,error}){
        if(data){
            console.log('Contacts==='+JSON.stringify(data));
        }if(error){
            console.error('Error==='+JSON.stringify(error));
        }
    }
     handlerFilterChange(event){
        this.selectedAccount=event.detail.accountId;
        this.selectedIndustry=event.detail.industry;

    }
}