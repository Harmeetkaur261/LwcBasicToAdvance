public with sharing class OpportunityDetail {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityRecord(){
        List<Opportunity> oppList = [SELECT Id, Name, StageName, CloseDate, Amount FROM Opportunity WITH USER_MODE];
        return oppList;
    }
    @AuraEnabled
    public static void deleteOpportunity(Id oppId){
        delete [SELECT Id FROM Opportunity WHERE Id = :oppId];

    }

    @AuraEnabled(cacheable=true)
  public static Decimal getfindSomeOfAmount(){
        AggregateResult result = [SELECT SUM(Amount) totalAmount FROM Opportunity];
        Decimal totalAmount = (Decimal)result.get('totalAmount');
        return totalAmount;
  }
  

}
