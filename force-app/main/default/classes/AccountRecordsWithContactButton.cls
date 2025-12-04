public with sharing class AccountRecordsWithContactButton {
    @AuraEnabled(cacheable=true)
    public static List<OutputWrapper> getAccountOpp() {
        List<OutputWrapper> Wrap = new List<OutputWrapper>();
        for(Account acc:[Select id,Name,Type,BillingCountry,(Select Id from Opportunities) from Account where ownerId=:UserInfo.getUserId()]){
        
         OutputWrapper output = new OutputWrapper();
         output.urlName = '/'+acc.Id;
         output.accountId = acc.Id;
         output.type = acc.Type;
         output.country = acc.BillingCountry;
         output.name = acc.Name;
         output.OpportunityCount = acc.Opportunities.size();
         Wrap.add(output);
        }
        return wrap;
    }
    
@AuraEnabled
public static void deleteRecords(String accountId){
    Account acc=[select id,(select id from opportunities where isClosed=false) from Account where id=:accountId WITH USER_MODE];
     if(acc.Opportunities.size()>0){
     throw  new AuraHandledException('Cannot delete Account with Open Opportunities');
}else{
    try {
        delete acc;
    } catch (Exception ex) {
        throw new AuraHandledException(ex.getMessage());
    }
    
   
}
}

    public class OutputWrapper{
        @AuraEnabled
    public  String urlName;
        @AuraEnabled
    public  Id accountId;
        @AuraEnabled
    public String type;
        @AuraEnabled
    public String country;
    @AuraEnabled
    public  String name;
        @AuraEnabled
    public  Integer OpportunityCount;
    }
}