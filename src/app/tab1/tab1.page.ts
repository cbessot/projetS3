import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private platform: Platform,private dbMeter: DBMeter,private batteryStatus: BatteryStatus,private geolocation: Geolocation,private gyroscope: Gyroscope,private sensors: Sensors) {platform.ready().then(() => {});}

  getD() {

    let subscription = this.dbMeter.start().subscribe(
    data => console.log(data)
  );
  subscription.unsubscribe();

  }


  getB() {
    const subscription = this.batteryStatus.onChange().subscribe(status => {
   console.log(status.level, status.isPlugged);
});

  }

  getAll() {
    try {
      this.sensors.enableSensor(TYPE_SENSOR.LIGHT);

}
catch(error) {
  console.error("erreur ios");
}

let subscription = this.dbMeter.start().subscribe(
data => console.log(data)
);
subscription.unsubscribe();


const subscription1 = this.batteryStatus.onChange().subscribe(status => {
console.log(status.level, status.isPlugged);
});
subscription1.unsubscribe();
try {
  var promise1 = Promise.resolve(this.sensors.getState());

promise1.then(function(value) {
  console.log(value);
  // expected output: 123
});
}
catch(error) {
console.error("null");
}




  }





}
