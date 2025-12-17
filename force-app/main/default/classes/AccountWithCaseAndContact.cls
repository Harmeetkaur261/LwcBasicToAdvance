public with sharing class AccountWithCaseAndContact {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccount(){
    return [Select Id, Name from Account];
   }

@AuraEnabled(cacheable=true)
   public static relatedWrapper getRelatedRecords(Id accountId){
    
List<Account> acc = [Select Id, Name, (Select Id, Subject ,status from Cases where Status!='Closed'), (Select Id, FirstName, LastName from Contacts) from Account where Id =: accountId LIMIT 1];
      relatedWrapper wrap = new relatedWrapper();
      wrap.caseList = acc[0].Cases ;
      wrap.contactList = acc[0].Contacts;
      return wrap;
     
   }


   public class relatedWrapper{
      @AuraEnabled
      public List<Case> caseList;
      @AuraEnabled
      public List<Contact> contactList;
   }
}