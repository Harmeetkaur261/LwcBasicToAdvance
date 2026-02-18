 import { LightningElement,wire } from 'lwc';
import getContactRecord from '@salesforce/apex/contactListRecord.getContactRecord';
export default class FilteringAndSorting extends LightningElement {
    delayTimeout;
    heading=["Id","Name","Email","Title"];
filterData=[];
fullDataTable=[];
filterBy='Name';
@wire(getContactRecord) 
contactList({error,data}){
    if(data){
        console.log('data--->',data);
        this.fullDataTable = data;
        this.filterData = data;
    }
    if(error){
        console.log('error--->',error);
    }   
}
get filterOptions(){
 return[
    {label:'All',value:'All'},
     {label:'Id',value:'Id'},
    {label:'Name',value:'Name'},
    {label:'Email',value:'Email'},
    {label:'Title',value:'Title'},
   
 ]
}
 handleSortChange(event){
    this.filterBy = event.detail.value;
 }

handlekeyUp(event){
    const searchKey = event.target.value.toLowerCase();
   
    if(searchKey){
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout=window.setTimeout(() => {
             console.log('searchKey--->',searchKey);
this.filterData = this.fullDataTable.filter(item => {
    if(this.filterBy === 'All'){
        return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(searchKey);
        });
    }else{  
    const val=item[this.filterBy] ? item[this.filterBy] : '';
    return val.toLowerCase().includes(searchKey);
    }
    });
   
        }, 500);
    
} else{
        this.filterData = [...this.fullDataTable];
    }


}
}