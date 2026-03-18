public with sharing class ExpensesTracker {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getExpensesTrackerData(Date startDate, Date endDate) {
        return [SELECT Expense_Type__c,sum(Expense_Amount__c)TotalAmount from Expense__c where Expense_Date__c >= :startDate and Expense_Date__c <= :endDate WITH USER_MODE group by Expense_Type__c];
        
    }
   
}