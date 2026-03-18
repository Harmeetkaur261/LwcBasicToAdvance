import { LightningElement,wire } from 'lwc';
import { getObjectInfo, getPicklistValues,getPicklistValuesByRecordType  } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import RATING_FIELD from "@salesforce/schema/Account.Rating";


export default class GetRecordWireAdaptor extends LightningElement {
  
value;

  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  accountInfo;

  @wire(getPicklistValues, {recordTypeId:"$accountInfo.data.defaultRecordTypeId", fieldApiName: RATING_FIELD })
  ratingPickList;
 @wire(getPicklistValuesByRecordType, {
    objectApiName:ACCOUNT_OBJECT,
    recordTypeId:"$accountInfo.data.defaultRecordTypeId",
  })industryvalue;

 handleChange(event){
    this.value = event.detail.value;
  }
}