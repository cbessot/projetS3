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
  lux:number;
  decibel:number;
  battery:number;
private database: SQLiteObject;
  constructor(private sqlite: SQLite,private geolocation: Geolocation,private alertController: AlertController, private platform: Platform, private sensors:Sensors,private sensors1:Sensors,private dbMeter: DBMeter,private batteryStatus: BatteryStatus,private gyroscope: Gyroscope) {
this.initializeDatabase();
   /* this.proximity = 0;

    platform.ready().then(() => {
      this.initSensor();
    })
*/
this.getDB();
this.sensors.enableSensor("LIGHT");
this.getBattery();

  }


  //function to catch geolocation data
   async locate(){
    const loc = await this.geolocation.getCurrentPosition().catch((error) => {
       console.log('Error getting location', error);
       this.errorAlert();
     });
     const loca = [loc.coords.latitude,loc.coords.longitude];
     return loca;
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

 getBattery() {
  const subscription = this.batteryStatus.onChange().subscribe(status => {
     this.battery=status.level;
  });





  }



   async getLUX() {


     const promise = await Promise.resolve(this.sensors.getState()).catch(error => {console.log("erreur");
    return "ND";});
   if(promise=="ND") {
     return promise;
   }
   else {return promise[0];}


  }

  async getGyro() {

   const orientation = await Promise.resolve(this.gyroscope.getCurrent()).catch(error => console.log(error));
   var gyro = [orientation.x,orientation.y,orientation.z];
   return gyro
  }

async getTemp() {

  const promise = await Promise.resolve(this.sensors.getState()).catch(error => {console.log("erreur");
 return "ND";});
if(promise=="ND") {
  return promise;
}
else {return promise[0];}

}

getDB() {
  let subscription = this.dbMeter.start().subscribe(
  data => this.decibel=data);
  console.log("db initSensor");
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
    'CREATE TABLE IF NOT EXISTS capteurs(lux, celsius, decibel, localisation,batterie,gyroscope,temp)', [])
    .then(() => console.log('Successfully created software table.'))
      .catch(e => console.log(e));
  }).catch(e => console.log(e));
}

async insertD() {
setInterval(async () => {
this.getBattery();
const valu = await this.getLUX();
const valus = await this.getGyro();
const coord = await this.locate();

const db = this.decibel;
const bat = this.battery;
const time = Date.now();
  this.database.transaction((tx) => {
tx.executeSql("INSERT INTO capteurs (lux, celsius, decibel, localisation,batterie,gyroscope,temp) VALUES (?,?,?,?,?,?,?)",
[ valu , "ND", db,coord,bat,valus,time], (tx, result) => {
  console.log("insertId: " + result.insertId);  // New Id number
  console.log("rowsAffected: " + result.rowsAffected);  // 1
});
});},3000);}

dropT() {
  this.database.transaction((tx) => {
tx.executeSql("DROP TABLE capteurs",
[], () => {});
});
console.log("table effacé");
}




async getTest() {
  setInterval(async () => {
console.log(this.battery);},3000);}



























  }
