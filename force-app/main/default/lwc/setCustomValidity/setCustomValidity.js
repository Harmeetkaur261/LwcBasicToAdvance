import { LightningElement } from 'lwc';

export default class SetCustomValidity extends LightningElement {
    
    handleChange(event) {
        const inputCmp = event.target;
        const value = inputCmp.value;
      

        // Custom rule: minimum length = 5
        if (value.length < 5) {
            inputCmp.setCustomValidity("Text must be at least 5 characters long");
           
        } else {
            inputCmp.setCustomValidity("");   // clear error
        }

        inputCmp.reportValidity();   // show the error message
    }
}