import { LightningElement } from 'lwc';

export default class ParentCommunication extends LightningElement {
    count=1;
    endValue=0;
    message='Default Message';
    handleChildEvent(event){
        this.endValue=event.detail.endval;
        this.message=event.detail.msg;
        if(this.count<this.endValue){
            this.count=this.count+1;
        }
    }
}