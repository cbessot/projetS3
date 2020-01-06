import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,],
  providers: [

    Sensors,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    Brightness,
    Platform,
    AlertController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OpenNativeSettings,
    BatteryStatus,
    DBMeter,
    Gyroscope,
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
