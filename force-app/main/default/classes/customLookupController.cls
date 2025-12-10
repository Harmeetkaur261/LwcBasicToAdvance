public with sharing class customLookupController {
   @AuraEnabled(cacheable=true)
   public static list<sObject> searchRecord(string objectApiName , string searchKey){
    List<sObject> sobjList = new List<sObject>();
    if(String.isNotBlank(searchKey)){
    string key='%'+searchKey+'%';
    string query = 'SELECT Id,Name FROM '+objectApiName+' WHERE Name LIKE:key';
    sobjList = Database.query(query,AccessLevel.USER_MODE);
   }
    return sobjList;
   }

}