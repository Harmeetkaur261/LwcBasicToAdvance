public with sharing class contactListRecord {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactRecord(){
        return [SELECT Id, Name, Email ,Title FROM Contact];
    }

    
}