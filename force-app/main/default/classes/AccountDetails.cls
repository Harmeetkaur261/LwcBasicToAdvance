public with sharing class AccountDetails {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetails() {
        return [SELECT Id, Name FROM Account LIMIT 10];
    }
    @AuraEnabled
    public static relatedWrapper getRelatedRecords(Id accountId){
    
List<Account> acc = [Select Id, Name, (Select Id,StageName,Amount,LeadSource from Opportunities), (Select Id, FirstName, LastName,Email from Contacts) from Account where Id =: accountId LIMIT 1];
      relatedWrapper wrap = new relatedWrapper();
      wrap.opportunityList = acc[0].Opportunities ;
      wrap.contactList = acc[0].Contacts;
      return wrap;
     
   }


   public class relatedWrapper{
      @AuraEnabled
      public List<Opportunity> opportunityList;
      @AuraEnabled
      public List<Contact> contactList;
   }
}