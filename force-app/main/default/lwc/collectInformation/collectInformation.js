import { LightningElement } from 'lwc';

export default class CollectInformation extends LightningElement {
     name = '';
    email = '';
    phone = '';
    country = '';
    address = '';

    countryOptions = [
        { label: 'India', value: 'India' },
        { label: 'USA', value: 'USA' },
        { label: 'Canada', value: 'Canada' }
    ];

    handleChange(event) {
        const field = event.target.name;
        if (field === 'name') {
            this.name = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'phone') {
            this.phone = event.target.value;
        } else if (field === 'country') {
            this.country = event.target.value;
        } else if (field === 'address') {
            this.address = event.target.value;
        }
    }
}