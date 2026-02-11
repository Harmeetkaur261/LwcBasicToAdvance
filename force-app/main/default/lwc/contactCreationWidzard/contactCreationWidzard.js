import { LightningElement ,track} from 'lwc';
import Contact_Object from '@salesforce/schema/Contact';
import FirstName_Field from '@salesforce/schema/Contact.FirstName';
import LastName_Field from '@salesforce/schema/Contact.LastName';
import Email_Field from '@salesforce/schema/Contact.Email';
import Phone_Field from '@salesforce/schema/Contact.Phone';
import AccountId_Field from '@salesforce/schema/Contact.AccountId';
import Title_Field from '@salesforce/schema/Contact.Title';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreationWidzard extends LightningElement {
    @ track contact={
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        accountId: '',
        title: ''
       };
     objectApiName=Contact_Object;
fields={
    firstName:FirstName_Field,
    lastName:LastName_Field,
    email:Email_Field,
    phone:Phone_Field,
    accountId:AccountId_Field,
    title:Title_Field
};  

currentStepString='Step1';
  get isStep1(){
    return this.currentStepString==='Step1';
  }
  get isStep2(){
    return this.currentStepString==='Step2';
  }
  get isStep3(){
    return this.currentStepString==='Step3';
  }
  handleNext(){
    if(this.currentStepString==='Step1'){
        this.currentStepString='Step2';
    }else if(this.currentStepString==='Step2'){
        this.currentStepString='Step3';
    }
  }
  handlePrev(){
    if(this.currentStepString==='Step2'){
        this.currentStepString='Step1';
    }else if(this.currentStepString==='Step3'){
        this.currentStepString='Step2';
    }
  }
  handleSuccess(event){
    const toastEvent=new ShowToastEvent({
        title:'Contact Created',
        message:'Contact created with Id: '+event.detail.id,
        variant:'success'
    });
    this.dispatchEvent(toastEvent);
    this.currentStepString='Step1';
  }
}
