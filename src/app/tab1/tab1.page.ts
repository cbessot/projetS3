import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Time } from '@angular/common';
>>>>>>> 8e7338b0b43d99b386260e3d04a01800ac276488

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

<<<<<<< HEAD
  constructor() {}

}
=======
  var:any;

  constructor(private geolocation: Geolocation) {}
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
     
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  locationRepeat(){
     this.var = setInterval(function(){ 
     this.locate(); 
      }, 3000);
   }

  stopLocation(){
    clearInterval(this.var);
  }
  }
>>>>>>> 8e7338b0b43d99b386260e3d04a01800ac276488
