import { LightningElement } from 'lwc';

export default class ButtonClick extends LightningElement {
     message='Click on any button to see the changes into the UI';
        handleClick(event){
            const buttonLabel=event.target.label;
            if(buttonLabel==='Button1'){
                this.message='Button1 Clicked';
            } else if(buttonLabel==='Button2'){
                this.message='Button2 Clicked';
            }
         
        }
}