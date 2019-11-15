import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  data:string='';
  constructor(private geolocation: Geolocation) {}

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = "lattitude : " + resp.coords.latitude + " longitude : "+ resp.coords.latitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
