import { LightningElement } from 'lwc';

export default class ParentCmp extends LightningElement {
    renderedCallback(){

 this.template.querySelector('c-child-Cmp')._receiverprop="Day 30 LWC Course Series";
this.template.querySelector('c-child-Cmp').method1('Hello World');
}
}