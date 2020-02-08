import {
  Component
} from '@angular/core';
import {
  SQLite,
  SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import {
  Tab1Page
}
from '../tab1/tab1.page';
import {
  LocationStrategy
} from '@angular/common';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import { Sensors, TYPE_SENSOR
} from '@ionic-native/sensors/ngx';
import { BatteryStatus
} from '@ionic-native/battery-status/ngx';
import { DBMeter
} from '@ionic-native/db-meter/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions
} from '@ionic-native/gyroscope/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  private database: SQLiteObject;
  lux: number;
  decibel: number;
  battery: number;

  constructor(private barcodeScanner: BarcodeScanner, private sqlite: SQLite, private sensors: Sensors,private dbMeter: DBMeter, private sensors1: Sensors, private batteryStatus: BatteryStatus, private gyroscope: Gyroscope,private geolocation: Geolocation) {
    this.getDB();
    this.sensors.enableSensor("LIGHT");
    this.getBattery();
    this.initializeDatabase();
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  getDB() {
    let subscription = this.dbMeter.start().subscribe(
    data => this.decibel=data);
    console.log("db initSensor");
  }

  getBattery() {
    const subscription = this.batteryStatus.onChange().subscribe(status => {
      this.battery = status.level;
    });
  }

    //function to catch geolocation data
    async locate() {
      const loc = await this.geolocation.getCurrentPosition().catch((error) => {
        console.log('Error getting location', error);
      });
      const loca = [loc.coords.latitude, loc.coords.longitude];
      return loca;
    }

    async getTemp() {

      const promise = await Promise.resolve(this.sensors.getState()).catch(error => {
        console.log("erreur");
        return "ND";
      });
      if (promise == "ND") {
        return promise;
      } else {
        return promise[0];
      }
    }

    async getLUX() {
      const promise = await Promise.resolve(this.sensors.getState()).catch(error => {
        console.log("erreur");
        return "ND";
      });
      if (promise == "ND") {
        return promise;
      } else {
        return promise[0];
      }
    }

  async getGyro() {
    const orientation = await Promise.resolve(this.gyroscope.getCurrent()).catch(error => console.log(error));
    var gyro = [orientation.x, orientation.y, orientation.z];
    return gyro
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.insertD(barcodeData["text"]);
    }).catch(err => {
      console.log('Error', err);
    })
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
          'CREATE TABLE IF NOT EXISTS Scanner(temps,ScanText,lux, celsius, decibel, localisation,batterie,gyroscope)', [])
        .then(() => console.log('Successfully created software table Scanner.'))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  async insertD(BarcodeText) {
    this.getBattery();
    const valu = await this.getLUX();
    const valus = await this.getGyro();
    const coord = await this.locate();
    const bat = this.battery;
    const text = await BarcodeText;
    const db = this.decibel;
    const time = Date.now();
    this.database.transaction((tx) => {
      tx.executeSql("INSERT INTO Scanner (temps,ScanText,lux, celsius, decibel, localisation,batterie,gyroscope) VALUES (?,?,?,?,?,?,?,?)",
        [time, text, valu , "ND", db,coord,bat,valus], (tx, result) => {
          console.log("insertId: " + result.insertId); // New Id number
          console.log("rowsAffected: " + result.rowsAffected); // 1
          console.log("data insert correctly");
        });
    })
  }

  dropT() {
    this.database.transaction((tx) => {
      tx.executeSql("DROP TABLE Scanner",
        [], () => {});
    });
    console.log("table Scanner effacée");
  }
}
