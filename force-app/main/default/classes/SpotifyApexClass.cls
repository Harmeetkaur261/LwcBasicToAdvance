public with sharing class SpotifyApexClass {
   @AuraEnabled (cacheable=true )
    public static string searchWithSpotify(String trackName){
        Http http =new Http();
        HttpRequest request=new HttpRequest();
        request.setMethod('GET');
        String encodedName=EncodingUtil.urlEncode(trackName,'UTF-8');

        request.setEndpoint('callout:SpotifyIntegration/v1/search?q='+encodedName+'&type=track&limit=1&offset=1');
        try {
            httpresponse response = http.send(request);
            System.debug(' httpresponse ='+ response.getBody());
            System.debug('Response Status Code : '+response.getStatusCode());
            System.debug('Response Status : '+response.getStatus());
            if(response.getStatusCode() == 200){
                return response.getBody();
            }else{
                throw new AuraHandledException('Error from Spotify API. Status Code: ' + response.getStatusCode());
            }
            

        } catch (Exception ex) {
            System.debug(ex.getMessage());
            throw new AuraHandledException(ex.getMessage());
           // return ex.getMessage();
        }
    } 

   }
   
