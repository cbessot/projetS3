import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Time } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  var:any; //var to stock the interval
  proximity:number;
  lux:number;
private database: SQLiteObject;
  constructor(private sqlite: SQLite,private geolocation: Geolocation,private alertController: AlertController, private platform: Platform, private sensors:Sensors,private sensors1:Sensors,private dbMeter: DBMeter,private batteryStatus: BatteryStatus,private gyroscope: Gyroscope) {
this.initializeDatabase();
   /* this.proximity = 0;

    platform.ready().then(() => {
      this.initSensor();
    })
*/
  }


  //function to catch geolocation data
   locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
       this.errorAlert();
     });
  }

  //interval about function of data collect

  locationRepeat(){
   // this.presentAlert('Demarrage de l\'analyse','Appuyez sur \'GO\' pour commencez','GO');
   this.presentAlertConfirmStartAnalyze();
  }

   stopLocation(){
    clearInterval(this.var);
    this.presentAlert('Fin de l\'analyse','merci d\'avoir participé','Ok');
  }
  //ALERT
 //Error alert
  async errorAlert(){
    const alert = await this.alertController.create({
      header: 'Erreur',
      message: 'Veuillez réessayer',
      buttons: ['Cancel']
    });
    await alert.present();
  }

  //Starting alert
  async presentAlert(msg,msg2,msg3) {
    const alert = await this.alertController.create({
      header: msg,
      message: msg2,
      buttons: [msg3]
    });
    await alert.present();
  }

  //alert With Multiple Choice and referenced to function start : yes/no
  // with the yes-button , let's start the analyze, with the no-button it cancel alert and don't start analyze
  async presentAlertConfirmStartAnalyze() {
    const alert = await this.alertController.create({
      header: 'Démarage de l\'analyse',
      message: 'Etes-vous prêt à commencer l\'analyse ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (Cancel) => {
            console.log('Cancel button was enable');
          }
        }, {
          text: 'Yes',
          handler: (Go) => {
            this.var = setInterval(() => {
              this.locate()
            },3000)
          }
        }
      ]
    });

    await alert.present();
  }

  /*initSensor() {
    sensors.enableSensor("PROXIMITY")
    setInterval(() => {
      sensors.getState((values) => {
        this.proximity = values[0]
      });
    }, 300)
    console.log(this.proximity);
  }*/

  /*initSensor(){
    sensors.enableSensor("LIGHT");
    console.log(sensors.getState());
  }*/

async getBattery() {
  const subscription = this.batteryStatus.onChange().subscribe(status => {
 console.log(status.level, status.isPlugged);
});



  }

  async getDB() {
    let subscription = this.dbMeter.start().subscribe(
  data => {console.log(data);
  }
);


  }

   async getLUX() {

    this.sensors.enableSensor("LIGHT");

    const promise = await Promise.resolve(this.sensors.getState()).catch(error => console.log(error));
    return promise[0];


  }

  getGyro() {
    this.gyroscope.getCurrent().then((orientation: GyroscopeOrientation) => {
     console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
   });
  }

getTemp() {
  this.sensors.enableSensor("TEMPERATURE");

  const promise = Promise.resolve(this.sensors.getState());

  promise.then(function(value) {
    console.log(value[0]);
    // expected output: 123
  }).catch(error => {console.log("erreur")});

}











  private async initializeDatabase() {
// Create or open a table
this.sqlite.create({
  name: "data.db",
  location: "default",
  // Key/Password used to encrypt the database
  // Strongly recommended to use Identity Vault to manage this
  key: "153009992DK"
}).then((db: SQLiteObject) => {
  this.database = db;

  db.executeSql(
    'CREATE TABLE IF NOT EXISTS capteurs(lux, celsius, decibel, localisationLa,localisationLo,batterie,gyroscope,temp)', [])
    .then(() => console.log('Successfully created software table.'))
      .catch(e => console.log(e));
  }).catch(e => console.log(e));
}

async insertD() {
setInterval(async () => {
const valu = await this.getLUX();
  this.database.transaction((tx) => {
tx.executeSql("INSERT INTO capteurs (lux, celsius, decibel, localisationLa,localisationLo,batterie,gyroscope,temp) VALUES (?,?,?,?,?,?,?,?)",
[ valu , "35", "45", "3.15288","4.54898","86","465","465498"], (tx, result) => {
  console.log("insertId: " + result.insertId);  // New Id number
  console.log("rowsAffected: " + result.rowsAffected);  // 1
});
});},3000);}






async getTest() {
  setInterval(async () => {const valu = await this.getLUX();
console.log(valu);},3000);}



























  }
