import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
//import { Sensors, SensorsOriginal } from '@ionic-native/sensors'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  location:string='';  //données GPS
  luminosity:Promise<any>;
  var:number = 0;
  temperature:string="";
  constructor(private geolocation: Geolocation, private brightness: Brightness) {}

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.location = "lattitude : " + resp.coords.latitude + " longitude : "+ resp.coords.longitude;
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
    let brightnessValue = 0.8;
    this.brightness.setBrightness(brightnessValue);
  }
}
