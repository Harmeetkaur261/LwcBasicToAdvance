import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class CreateAccountWithFlow extends NavigationMixin(LightningElement) {
    handleStatusChange(event) {
    if (event.detail.status === 'FINISHED') {
        // set behavior after a finished flow interview
        const event = new ShowToastEvent({
            title: 'Success!',
message: 'The account was created successfully.',
variant: 'success',
        });
        this.dispatchEvent(event);
    }
    }
}
