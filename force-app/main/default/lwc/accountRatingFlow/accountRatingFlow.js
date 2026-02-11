import { LightningElement ,api,wire} from 'lwc';
import Account_Rating from '@salesforce/schema/Account.Rating';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

export default class AccountRatingFlow extends LightningElement {
   @api recordId;
   accountRating;
   @wire(getRecord, { recordId: '$recordId', fields: [Account_Rating] })
   wiredAccount({ error, data }) {
     if (data) {
       this.accountRating = getFieldValue(data, Account_Rating);
     } else if (error) {
       // handle error
     }
   }

   get isAvailableRatingHot(){
    return this.accountRating === 'Warm'?true:false;
   }
   get isAvailableRatingCold(){
    return this.accountRating === 'Cold'?true:false;
   }
   get isAvailableRatingWarm(){
    return this.accountRating === 'Hot'?true:false;
   }

   get inputVariables() {
    return [
      {
        name: 'AccountRatingHot',
        type: 'text',
        value: this.isAvailableRatingHot
      },
      {
        name: 'AccountRatingCold',
        type: 'text',
        value: this.isAvailableRatingCold
      },
      {
        name: 'AccountRatingWarm',
        type: 'text',
        value: this.isAvailableRatingWarm
      }
    ];
  }

}