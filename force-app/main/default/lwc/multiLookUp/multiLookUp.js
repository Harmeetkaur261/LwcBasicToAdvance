import { LightningElement,wire,api } from 'lwc';
import searchRecord from '@salesforce/apex/customLookupController.searchRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const DELAY = 300;
export default class MultiLookUp extends LightningElement {
     @api searchKey ;
    searchRecords=[];
    error;
    selectedPills=[];
    placeholder="Search Account...";
    @api objectApiName="Account";
    @api label="Account";
    @api iconName="standard:account";
    hasRecords=false;
    displayDelay;
   @wire(searchRecord, {searchKey:'$searchKey', objectApiName:'$objectApiName' })
   records({data, error}) {
        if(data) {
            this.searchRecords = data;
            this.hasRecords = data.length> 0 ? true:false;
            console.log('Records--->',this.searchRecords);
            this.error = undefined;
        }
        if(error) {
            this.error = error;
            this.searchRecords = undefined;
        }
   }
    handleChange(event){
        clearTimeout(this.displayDelay);
        let value = event.target.value;
       this.displayDelay=setTimeout(() => {
            this.searchKey =value;
        }, DELAY);
}
clickHandler(event){
    let recId=event.target.getAttribute('data-recid');
    console.log('Selected Record Id-->',recId);
    if(this.validateSelection(recId)){
 let selectedRecord=this.searchRecords.find(record=>record.Id===recId);
    let pill={
type:"icon" ,
label: selectedRecord.Name,
name:recId,
iconName:this.iconName,
alternativeText:selectedRecord.Name
};
this.selectedPills=[...this.selectedPills,pill];
    }
   
}
handleRemove(event){
    const index=event.detail.index;
    this.selectedPills.splice(index,1);
}
showPillContainer(){
    return this.selectedPills.length>0?true:false;
}
validateSelection(selectedRecord){
    let valid=true;
 let isRecordAlreadySelected=this.selectedPills.find(pill=>pill.name===selectedRecord);
 if(isRecordAlreadySelected){
    valid=false;
    this.dispatchEvent(new ShowToastEvent({
        title: "Error",
        message: "Pills is Already Selected",
        variant: "error"
    }));
}else{
    valid=true;
}
return valid;
}
}
    
    