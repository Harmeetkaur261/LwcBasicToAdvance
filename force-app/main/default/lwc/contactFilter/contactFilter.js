import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
export default class ContactFilter extends NavigationMixin(LightningElement) {
    selectAccountId;
    selectedIndustry;
    isButtonDisabled=true;
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;
    @wire(getPicklistValues, {
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
        fieldApiName: ACCOUNT_INUSTRY_FIELD
    })
    industryPicklistValues;
    handleContactSelection(event){
this.selectAccountId=event.detail;
console.log('selectAccountId==='+this.selectAccountId);
if(this.selectAccountId){
    this.isButtonDisabled=false;
}else{
    this.isButtonDisabled=true;
}
    this.notifyFilterChange();
    }


changeHandler(event){
     this.selectedIndustry=event.target.value;
     console.log('selectedIndustry==='+this.selectedIndustry);
     this.notifyFilterChange();
}
addNewContact(){  
    let defaultValues= encodeDefaultFieldValues ({
        AccountId: this.selectAccountId
    });
    let pageRef={
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Contact',
        actionName: 'new'
    },
    state: {
        defaultFieldValues : defaultValues,
       
    }
};
this[NavigationMixin.Navigate](pageRef);
}
notifyFilterChange(){
    let mycustomEvent= new CustomEvent('filterchange',{
        detail:{
            accountId:this.selectAccountId,
            industry:this.selectedIndustry
        }
    });
    this.dispatchEvent(mycustomEvent);
}
}