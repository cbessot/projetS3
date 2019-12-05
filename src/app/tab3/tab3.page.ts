import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
import { TimeInterval } from 'rxjs';
//import { Sensors, SensorsOriginal } from '@ionic-native/sensors'
>>>>>>> 8e7338b0b43d99b386260e3d04a01800ac276488

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

<<<<<<< HEAD
  constructor() {}

=======

  constructor(private geolocation: Geolocation, private brightness: Brightness) {}

  //var interval:TimeInterval;
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
     
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  // locationRepeat(){
  //   var i:number = 0;
  //   var interval = setInterval(function(){ 
  //     this.locate();
  //     if (i > 10) clearInterval(interval);
  //     i++;
  //  }, 1000);
  // }

  // temperate(){
  //   this.temperature = this.sensors.enableSensor(SensorsOriginal.TYPE_AMBIENT_TEMPERATURE);
  // }
  luminate(){
    console.log(this.brightness.getBrightness());
  }
>>>>>>> 8e7338b0b43d99b386260e3d04a01800ac276488
}
