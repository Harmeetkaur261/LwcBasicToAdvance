import { LightningElement,wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';

import accountDetails from '@salesforce/messageChannel/accountDetails__c';

export default class SubscribeAccountChannel extends LightningElement {
    subscription = null;
    recordId =null;
    @wire(MessageContext)
    messageContext;
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
     subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
               accountDetails ,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
     handleMessage(message) {
        this.recordId=message.recordId;
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
     unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}