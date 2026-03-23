import { LightningElement,api } from 'lwc';

export default class ChildCmp extends LightningElement {
    
  @api receiver='Learning Salesforce';

   receiverprop="LWC Day";

   display;

   get _receiverprop(){
    return this.receiverprop;
   }
@api set _receiverprop(value){
    this.receiverprop=value;
}

   @api method1(p1){
        this.display=p1;
   
}
}

