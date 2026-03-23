import { LightningElement } from 'lwc';

export default class ConnectedCallBackPractice extends LightningElement {
    state;
    element;
    toggleValue;
    isHasRendered=false;
    connectedCallback() {
       this.state=this.template.isConnected;
       console.log('@@@Connected Call Back State:', this.state);
        console.log('@@@Connected Call Back is called', this.template.isConnected);
      // this.element = this.template.querySelector('lightning-input').checked;(getting error )
     // console.log('@@@Connected Call Back element', this.element);
    }
    constructor(){
        super();
        console.log('@@@Constructor is called', this.template.isConnected);
    }
    renderedCallback(){
        if(this.isHasRendered)
            return;
        
        this.isHasRendered=true;
        console.log('@@@Rendered Call Back is called', this.template.isConnected);
         this.element = this.template.querySelector('lightning-input').checked;
        console.log('@@@Rendered Call Back element', this.element);
        console.log('@@@Rendered Call Back toggle value', this.toggleValue);
         console.log('@@@Rendered Call Back toggle value', this.template.querySelector('lightning-input').checked);
        this.toggleValue=this.template.querySelector('lightning-input').checked;
        console.log('@@@Rendered Call Back toggle value', this.toggleValue);
    }


}