import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Brightness } from '@ionic-native/brightness/ngx';
import { TimeInterval } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

//import { Sensors } from '@ionic-native/sensors'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  var:any;
  constructor(private geolocation: Geolocation,private openNativeSettings: OpenNativeSettings) {}

  accessibility(setting: string){
    this.openNativeSettings.open(setting).then(val => {
      alert(setting);
    }).catch(err => {
      alert(JSON.stringify(err));
    })
  }

  //var interval:TimeInterval;
  locate(){
    
    console.log(this.geolocation);
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
     
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  locationRepeat(){
    this.var = setInterval(() => {
      this.locate()
    },3000)
  }

  stopLocation(){
   clearInterval(this.var);
 }
 /*sensorTest(){
  Sensors.enableSensor("TYPE_SENSOR");
  console.log(Sensors.getState ());
 }*/

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


  
}
