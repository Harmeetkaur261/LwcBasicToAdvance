import { LightningElement,api } from 'lwc';

export default class ChildGetterSetter extends LightningElement {
    userDetails;

    @api
    get detailsInChild(){
        return this.userDetails;
    }

    set detailsInChild(value){
        this.userDetails={...value};
    }
      handleAgeChange() {
        const updatedAge = 35;

        this.dispatchEvent(
            new CustomEvent('agechange', {
                detail: updatedAge
            })
        );
    }
}