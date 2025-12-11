public with sharing class contactBrowserController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(string accountId ,string industry ) {
       string query= 'select Id,Name, Phone,PhotoUrl, Email from Contact';
       List<String> filters=new List<String>();
       if(string.isNotBlank(accountId)){
              filters.add('accountId=:accountId');
       }
       if(string.isNotBlank(industry)){
              filters.add('Contact.Account.Industry=:industry');
       }
       if(!filters.isEmpty()){
              query += ' where ' + String.join(filters,' AND ');
       }
       query +=' With USER_MODE Order By Name';
       List<Contact> conlist= Database.query(query);
         return conlist;
    }
    
}