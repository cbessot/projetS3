import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Time } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  var:any;

  constructor(private geolocation: Geolocation) {}
  private locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
     
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  private locationRepeat(){
     this.var = setInterval(function(){
        this.locate();
      }, 3000);
   }

  private stopLocation(){
    clearInterval(this.var);
  }
  }
