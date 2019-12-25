import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Time } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';

declare var sensors;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  var:any; //var to stock the interval
  proximity:number;

  constructor(private geolocation: Geolocation,private alertController: AlertController,  platform: Platform, private sensors:Sensors) {

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
  }
