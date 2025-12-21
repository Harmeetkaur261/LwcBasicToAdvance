import { LightningElement } from 'lwc';
import searchWithSpotify from '@salesforce/apex/SpotifyApexClass.searchWithSpotify';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class SpotifySearch extends LightningElement {
    searchTerm = '';
    displayResult=false;
   searchResults ='';
   trackUrl='';
    error;
    handleInputChange(event) {
        this.searchTerm = event.target.value;
    }
  async  searchTrack(){
        let isValid = this.validateInput();
        if(isValid){
            try{
                let results = await searchWithSpotify({trackName:this.searchTerm });
               let parsedResults = JSON.parse(results);
               this.displayResult=true;
                this.searchResults = parsedResults.tracks.items[0];
                this.trackUrl=this.searchResults.album.images[0].url;
               console.log('parsedResults--->',parsedResults);
               
                
            }catch(error){
                this.error = error;
              
                this.showErrorToast('Error',error.body.message,'error');
            }
        }
      
    }

    validateInput(){
        let isValid = true;
        let element = this.template.querySelector('lightning-input');
        if(!element.checkValidity()){
            element.reportValidity();
            isValid = false;
        }
        return isValid;
    }
    showErrorToast(title, message,variant){ 
    this.dispatchEvent(new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    }));
    this.dispatchEvent(event);
}

    get artistName(){
       let artistNameArr= this.searchResults.artists.map(artist=>{ artist.name
        });
        let artistNames= artistNameArr.join(',');
        return artistNames;
    }
}


