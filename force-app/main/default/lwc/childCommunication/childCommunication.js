import { LightningElement } from 'lwc';

export default class ChildCommunication extends LightningElement {
    message = 'Hello from Child Component!';
    endval=5;
    handleClick(event) {
        const myEvent=new CustomEvent('myevent',{
        detail:{
            endval:this.endval,
            msg:this.message}});
        this.dispatchEvent(myEvent);
    }
}