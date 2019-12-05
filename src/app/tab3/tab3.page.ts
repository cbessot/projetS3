import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
import { TimeInterval } from 'rxjs';
//import { Sensors, SensorsOriginal } from '@ionic-native/sensors'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


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
}
