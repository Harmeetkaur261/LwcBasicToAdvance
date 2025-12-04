public with sharing class AccountRecord {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecord(){
        List<Account> accList = [SELECT Id, Name, Phone, Website, AnnualRevenue FROM Account WITH USER_MODE];
        return accList;
    }
}