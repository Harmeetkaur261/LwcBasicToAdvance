import { LightningElement,wire,api } from 'lwc';
import searchRecord from '@salesforce/apex/customLookupController.searchRecord';
const DELAY=300;
export default class CustomLookup extends LightningElement {
   @api apiName='Account';
    searchKey;   
   @api objectLabel='Account';   
   @api iconName="standard:account";   
    delayTimeOut; 
    selectedRecord={
        selectedId:'',
        selectedName:''
    }
    displayOptions=false;
@wire(searchRecord,{objectApiName:'$apiName',searchKey:'$searchKey'})
outputs;
get isRecordSelected(){
    return this.selectedRecord.selectedId=== ''? false:true;
}

changeHandler(event){
    window.clearTimeout(this.delayTimeOut);
    const searchKey=event.target.value;
    this.delayTimeOut=setTimeout(()=>{
        this.searchKey=searchKey;
        this.displayOptions=true;
    },DELAY);
}

clickHandler(event){
   let selectedId= event.currentTarget.dataset.item;
   console.log('selectedId==='+selectedId);
   let outputRecord=this.outputs.data.find(record=>record.Id===selectedId);
   console.log('outputRecord==='+JSON.stringify(outputRecord));
   this.selectedRecord={
    selectedId:outputRecord.Id,
    selectedName:outputRecord.Name
   };
   this.sendSelectionRecord();
   this.displayOptions=false;
}
removeSelectedRecord(event){
    this.selectedRecord={
        selectedId:'',
        selectedName:''
    };
    
    this.displayOptions=false;
   this.sendSelectionRecord();
} 
sendSelectionRecord(){
    const selectedEvent=new CustomEvent('selected',{
        detail:this.selectedRecord.selectedId
    });
    this.dispatchEvent(selectedEvent);
}
}






    
    
