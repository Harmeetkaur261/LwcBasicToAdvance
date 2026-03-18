import { LightningElement ,track} from 'lwc';

export default class InputTestCompo extends LightningElement {
    @track fields = [
        {objectApiName:"Contact", fieldApiName: "Name"},
        {objectApiName:"Contact", fieldApiName: "Email"},
        {objectApiName:"Contact", fieldApiName: "Phone" },
        {objectApiName:"Contact", fieldApiName: "Title" },
        {objectApiName:"Contact", fieldApiName: "Fax" },
        {objectApiName:"Contact", fieldApiName: "MailingAddress" },
        {objectApiName:"Contact", fieldApiName: "OtherAddress" }
    ];
    
    
}