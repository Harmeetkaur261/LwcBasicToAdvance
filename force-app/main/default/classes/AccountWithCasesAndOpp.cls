public with sharing class AccountWithCasesAndOpp {
    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountRecord(){
        List<AccountWrapper> accWrapList = new List<AccountWrapper>();
       for(Account acc:[SELECT Id, Name, Industry FROM Account WITH USER_MODE LIMIT 10]) {
       AccountWrapper  accWrap = new AccountWrapper();
       accWrap.name = acc.Name;
       accWrap.industry = acc.Industry;
       accWrap.accountId = acc.Id;
       accWrap.nameUrl='/'+acc.Id;
       accWrapList.add(accWrap);
       }
return accWrapList;
    }
    public class AccountWrapper{
        @AuraEnabled
        public String name;
        @AuraEnabled
        public String industry;
        @AuraEnabled
        public String accountId;
        @AuraEnabled
        public String nameUrl;
        
        
    }
    @AuraEnabled(cacheable=true)
   
    public static  List<RelatedWrapper> getRelatedRecords(List<String>accountIdList){
         List<RelatedWrapper> relatedRecords = new List<RelatedWrapper>();
        for(Account acc:[SELECT Id, (Select Id,CaseNumber,Priority,Account.Name from Cases),(Select Id,Name,StageName,Account.Name from opportunities) FROM Account WHERE Id IN :accountIdList WITH USER_MODE]){
RelatedWrapper relatedWrap = new RelatedWrapper();
relatedWrap.accountId = acc.Id;
relatedWrap.caseList = acc.Cases;
relatedWrap.oppList = acc.Opportunities;
relatedRecords.add(relatedWrap);
        }
        return relatedRecords;
    }
    public class RelatedWrapper{
        @AuraEnabled
        public String accountId;
        @AuraEnabled
      public  List<Case> caseList;
        @AuraEnabled
        public List<Opportunity>oppList;
    }

}