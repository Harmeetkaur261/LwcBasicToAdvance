public with sharing class ContactCreationController {

    @AuraEnabled(cacheable=true)
    public static List<Id> getLeadSourceValues(String leadSource) {

        // Guard clause
        if (String.isBlank(leadSource)) {
            return new List<Id>();
        }

        List<AggregateResult> results = [
            SELECT AccountId accId, COUNT(Id) oppCount
            FROM Opportunity
            WHERE AccountId != null
              AND Account.AccountSource = :leadSource
            
            GROUP BY AccountId
            HAVING COUNT(Id) > 1
        ];

        List<Id> accountIds = new List<Id>();
        for (AggregateResult ar : results) {
            accountIds.add((Id) ar.get('accId'));
        }

        return accountIds;
    }
}

