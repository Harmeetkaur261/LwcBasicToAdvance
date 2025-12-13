public with sharing class AccountDetailsController {
    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountDetails() {
        List<AccountWrapper> wraperList= new List<AccountWrapper>();
        for(Account acclist:[SELECT Id, Name, Industry,Type,(Select Id from opportunities) 
                FROM Account WITH USER_MODE LIMIT 10]){ 
        AccountWrapper accWrap = new AccountWrapper();
        accWrap.accountId=acclist.Id;
        accWrap.accountName=acclist.Name;
        accWrap.accountIndustry=acclist.Industry;
        accWrap.accountType=acclist.Type;
        accWrap.opportunityCount=acclist.Opportunities.size();
        accWrap.nameUrl ='/'+ acclist.Id;
        wraperList.add(accWrap);
       
     }
          return wraperList;
    }
   

    public class AccountWrapper{
        @AuraEnabled 
        public string nameUrl;
        @AuraEnabled
        public string accountName;
        @AuraEnabled
        public string accountId;
        @AuraEnabled
        public string accountIndustry;
        @AuraEnabled
        public string accountType;
        @AuraEnabled
        public integer opportunityCount;
    }
}
