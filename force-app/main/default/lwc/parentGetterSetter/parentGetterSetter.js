import { LightningElement } from 'lwc';

export default class ParentGetterSetter extends LightningElement {
     detailsInParent={
        "firstName":"John",
        "lastName":"Doe",
        "age":30
     }
       handleAgeChange(event) {
        this.detailsInParent = {
            ...this.detailsInParent,
            age: event.detail
        };
    }
}