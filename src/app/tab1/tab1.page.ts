import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Time } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

declare var sensors;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  
  var:any;
  proximity:number;


  constructor(private geolocation: Geolocation,private alertController: AlertController) {

   /* this.proximity = 0;
    
    platform.ready().then(() => {
      this.initSensor();
    })
*/
  }
   locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
     
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'C\'est parti !',
      message: 'Démarrage de l\'analyse',
      buttons: ['Let\'s go']
    });

    await alert.present();
  }
/*
  initSensor() {
    sensors.enableSensor("PROXIMITY")
    
    setInterval(() => {
      sensors.getState((values) => {
        this.proximity = values[0]
      });
    }, 300)
    
  }*/



  locationRepeat(){
    this.presentAlert();
    this.var = setInterval(() => {
      this.locate()
    },3000)
  }


   stopLocation(){
    clearInterval(this.var);
  }
 /* initSensor(){
    sensors.enableSensor("LIGHT");
    console.log(sensors.getState());
  }*/

  }
