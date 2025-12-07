import { LightningElement,wire } from 'lwc';
import getAccountRecord  from '@salesforce/apex/AccountWithCasesAndOpp.getAccountRecord';
import getRelatedRecords from '@salesforce/apex/AccountWithCasesAndOpp.getRelatedRecords'; 
const columns = [
    {label:'Account Name',fieldName:'name',type:'url',
        typeAttributes:{label:{fieldName:'name'},target:'_blank'}},
    {label:'Industry',fieldName:'industry',type:'text'}]
    const caseColumns = [
    { label: 'Case Number', fieldName: 'caseNumber', type: 'text' },
    { label: 'Priority', fieldName: 'priority', type: 'text' },
    { label: 'Status', fieldName: 'status', type: 'text' },
    {
        label: 'Account Name',
        fieldName: 'accNameUrl',
        type: 'url',
        typeAttributes: { label: { fieldName: 'accName' }, target: '_blank' }
    }
];

const oppColumns = [
    {
        label: 'Account Name',
        fieldName: 'accNameUrl',
        type: 'url',
        typeAttributes: { label: { fieldName: 'accName' }, target: '_blank' }
    },
    { label: 'Opportunity Name', fieldName: 'name', type: 'text' },
    { label: 'Stage Name', fieldName: 'stageName', type: 'text' }
];

export default class AccountWithCaseOpp extends LightningElement {
   caseColumns = caseColumns;
    oppColumns = oppColumns;
    columns = columns;
   cases=[];
   showCases=false;
   showOpportunities=false;
    opportunities=[];
    @wire(getAccountRecord) 
    accountRecord;
 getRelatedData(event) {
    const selectedRows = event.detail.selectedRows;
   let selectedAccIds = selectedRows.map(row => row.accountId); 
    console.log('selectedAccIds => ', JSON.stringify(selectedAccIds));
    this.getCasesAndOpp(selectedAccIds);
}
async getCasesAndOpp(selectedAccIds){
    const relatedRecords = await getRelatedRecords({accountIdList:selectedAccIds});
    console.log('relatedRecords => ', JSON.stringify(relatedRecords));
    this.cases = relatedRecords.reduce((acc, row) => {
            if (row.caseList && row.caseList.length > 0) {

                const processed = row.caseList.map(c => {
                    return {
                        caseId: c.Id,
                        caseNumber: c.CaseNumber,
                        priority: c.Priority,
                        status: c.Status,
                        accNameUrl: '/' + c.Account.Id,
                        accName: c.Account.Name
                    };
                });

                acc.push(...processed);
            }
            return acc;
        }, []);

        // PROCESS OPP LIST
        this.opportunities = relatedRecords.reduce((acc, row) => {
            if (row.oppList && row.oppList.length > 0) {

                const processed = row.oppList.map(o => {
                    return {
                        oppId: o.Id,
                        name: o.Name,
                        stageName: o.StageName,
                        accNameUrl: '/' + o.Account.Id,
                        accName: o.Account.Name
                    };
                });

                acc.push(...processed);
            }
            return acc;
        }, []);

        // Control visibility
        this.showCases = this.cases.length > 0;
        this.showOpportunities = this.opportunities.length > 0;
    }
}