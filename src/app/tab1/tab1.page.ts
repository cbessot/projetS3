import {
    Component,
    AfterViewInit
} from '@angular/core';
import {
    Geolocation
} from '@ionic-native/geolocation/ngx';
import {
    Time
} from '@angular/common';
import {
    Platform
} from '@ionic/angular';
import {
    AlertController
} from '@ionic/angular';
import {
    Sensors,
    TYPE_SENSOR
} from '@ionic-native/sensors/ngx';
import {
    BatteryStatus
} from '@ionic-native/battery-status/ngx';
import {
    DBMeter
} from '@ionic-native/db-meter/ngx';
import {
    Gyroscope,
    GyroscopeOrientation,
    GyroscopeOptions
} from '@ionic-native/gyroscope/ngx';
import {
    SQLite,
    SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
    HTTP
} from '@ionic-native/http/ngx';
import {
    SQLitePorter
} from '@ionic-native/sqlite-porter/ngx';
import {
    File
} from '@ionic-native/file/ngx';
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    var: any; //var to stock the interval
    lux: number;
    decibel: number;
    battery: number;
    private database: SQLiteObject;
    Rhttp: number;

    constructor(private sqlite: SQLite, private geolocation: Geolocation, private alertController: AlertController, private platform: Platform, private sensors: Sensors, private sensors1: Sensors, private dbMeter: DBMeter, private batteryStatus: BatteryStatus, private gyroscope: Gyroscope) {
        this.startDb();
        this.initializeDatabase();
        this.startBattery();
        this.sensors.enableSensor("LIGHT");
        this.presentAlert("Conditions générales d'utilisation","Client;tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou personne morale, qui visite le Site objet des présentes conditions générales. Prestations et Services : https://application-récolte-up13.fr met à disposition des Clients : \
Contenu : Ensemble des éléments constituants l’information présente sur le Site, notamment textes – images – vidéos.\
Informations clients : Ci après dénommé « Information (s) » qui correspondent à l’ensemble des données personnelles susceptibles d’être détenues par https://application-récolte-up13.fr pour la gestion de votre compte, de la gestion de la relation client et à des fins d’analyses et de statistiques. \
Utilisateur : Internaute se connectant, utilisant le site susnommé.\
Informations personnelles : « Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).\
Les termes « données à caractère personnel », « personne concernée », « sous traitant » et « données sensibles » ont le sens défini par le Règlement Général sur la Protection des Données (RGPD : n° 2016-679)\
Conditions générales d’utilisation du site et des services proposés. Conditions générales d’utilisation du site et des services proposés.\
Le Site constitue une œuvre de l’esprit protégée par les dispositions du Code de la Propriété Intellectuelle et des Réglementations Internationales applicables. Le Client ne peut en aucune manière réutiliser, céder ou exploiter pour son propre compte tout ou partie des éléments ou travaux du Site.\
L’utilisation du site https:\/\/application-récolte-up13.fr implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site https:\/\/application-récolte-up13.fr sont donc invités à les consulter de manière régulière.\
Ce site internet est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par https:\/\/application-récolte-up13.fr, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention. Le site web https:\/\/application-récolte-up13.fr est mis à jour régulièrement par https:\/\/application-récolte-up13.fr responsable. De la même façon, les mentions légales peuvent être\ modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance. \
Le Site constitue une œuvre de l’esprit protégée par les dispositions du Code de la Propriété Intellectuelle et des Réglementations Internationales applicables. Le Client ne peut en aucune manière réutiliser, céder ou exploiter pour son propre compte tout ou partie des éléments ou travaux du Site.\
L’utilisation du site https:\/\/application-récolte-up13.fr implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site https:\/\/application-récolte-up13.fr sont donc invités à les consulter de manière régulière. \
Ce site internet est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par https:\/\/application-récolte-up13.fr, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention. Le site web https:\/\/application-récolte-up13.fr est mis à jour régulièrement par https:\/\/application-récolte-up13.fr responsable. De la même façon, les mentions légales peuvent être\ modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.","Accepter");

    }


    //function to catch geolocation data
    async startLocate() {
        const loc = await this.geolocation.getCurrentPosition().catch((error) => {
            console.log('Error getting location', error);
            this.errorAlert();
        });
        const loca = [loc.coords.latitude, loc.coords.longitude];
        return loca;
    }

    //interval about function of data collect

    stopAnalyze() {
        clearInterval(this.var);
        this.presentAlert('Fin de l\'analyse', 'merci d\'avoir participé', 'Ok');
    }
    //ALERT
    //Error alert
    async errorAlert() {
        const alert = await this.alertController.create({
            header: 'Erreur',
            message: 'Veuillez réessayer',
            buttons: ['Cancel']
        });
        await alert.present();
    }

    //Starting alert
    async presentAlert(msg, msg2, msg3) {
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
            buttons: [{
                text: 'No',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (Cancel) => {
                    console.log('Cancel button was enable');
                }
            }, {
                text: 'Yes',
                handler: (Go) => {
                  this.insertD();
                  //setTimeout(this.stopAnalyze(),10000);
                  setTimeout(()=> {
                    clearInterval(this.var);
                    this.presentAlert('Fin de l\'analyse', 'merci d\'avoir participé', 'Ok');
                },1200000);
                }
            }]
        });

        await alert.present();
    }


    startBattery() {
        const subscription = this.batteryStatus.onChange().subscribe(status => {
            this.battery = status.level;
        });




    }



    async startLux() {


        const promise = await Promise.resolve(this.sensors.getState()).catch(error => {
            console.log(error);
            return "ND";
        });
        if (promise == "ND") {
            return promise;
        } else {
            return promise[0];
        }


    }

    async startGyroscope() {

        const orientation = await Promise.resolve(this.gyroscope.getCurrent()).catch(error => console.log(error));
        var gyro = [orientation.x, orientation.y, orientation.z];
        return gyro
    }

    async startTemp() {

        const promise = await Promise.resolve(this.sensors.getState()).catch(error => {
            console.log(error);
            return "ND";
        });
        if (promise == "ND") {
            return promise;
        } else {
            return promise[0];
        }

    }

    startDb() {
        let subscription = this.dbMeter.start().subscribe(
            data => this.decibel = data);
        console.log("db initSensor");
    }




    private async initializeDatabase() {
        // Create or open a table
        this.sqlite.create({
            name: "data.db",
            location: "default",

            key: "153009992DK"
        }).then((db: SQLiteObject) => {
            this.database = db;

            db.executeSql(
                    'CREATE TABLE IF NOT EXISTS capteurs(lux, celsius, decibel, localisation,batterie,gyroscope,temp)', [])
                .then(() => console.log('Successfully created capteurs table.'))
                .catch(e => console.log(e));
        }).catch(e => console.log(e));
    }

    async insertD() {
            this.sensors.enableSensor("LIGHT");
            this.var = setInterval(async () => {
            this.startBattery();
            const valu = await this.startLux();
            const valus = await this.startGyroscope();
            const coord = await this.startLocate();

            const db = this.decibel;
            const bat = this.battery;
            const time = Date.now();
            this.database.transaction((tx) => {
                tx.executeSql("INSERT INTO capteurs (lux, celsius, decibel, localisation,batterie,gyroscope,temp) VALUES (?,?,?,?,?,?,?)",
                    [valu, "ND", db, coord, bat, valus, time], (tx, result) => {
                        console.log("insertId: " + result.insertId); // New Id number
                        console.log("rowsAffected: " + result.rowsAffected); // 1
                    });
            });
        }, 3000);
    }

    dropT() {
        this.database.transaction((tx) => {
            tx.executeSql("DROP TABLE capteurs",
                [], () => {});
        });
        console.log("table effacé");
    }




  voirD() {
        this.database.transaction(function(tx) {
            tx.executeSql('SELECT * FROM capteurs', [], function(tx, rs) {
                let i = 0;
                let ch = "";
                while (i < rs.rows["length"]) {
                    ch = ch + "capteurs lux=\"" + rs.rows.item(i).lux + "\",celsius=\"" + rs.rows.item(i).celsius + "\",decibel=\"" + rs.rows.item(i).decibel + "\",localisation=\"" + rs.rows.item(i).localisation + "\",batterie=\"" + rs.rows.item(i).batterie + "\",gyroscope=\"" + rs.rows.item(i).gyroscope + "\" " + rs.rows.item(i).temp*1000000 + "\n";
                    i = i + 1;
                }
                cordova.plugin.http.setDataSerializer('utf8');
                cordova.plugin.http.post('http://ec2-34-242-18-0.eu-west-1.compute.amazonaws.com:8086/write?db=dataEnv', ch
                , {
                    Authorization: 'OAuth2: token'
                },function(response) {
                    console.log(response.status);
                    if(response.status==204) {
                      alert("l'envoi a été effectué");
                    }
                    else {
                      alert("veuillez réessayez s'il vous plait");
                    }
                }, function(response) {
                    console.error(response.error);


                });


                //console.log(rs.rows.item(15).lux);
            }, function(tx, error) {
                console.log('SELECT error: ' + error.message);
            });
            tx.executeSql("DROP TABLE capteurs",[], () => {});


            });
            this.database.executeSql(
                    'CREATE TABLE IF NOT EXISTS capteurs(lux, celsius, decibel, localisation,batterie,gyroscope,temp)', [])
                .then(() => console.log('Successfully created capteurs table.'))
                .catch(e => console.log(e));


    }





    async getTest() {
        this.startBattery();
        this.sensors.enableSensor("LIGHT");
        const lux = await this.startLux();
        this.sensors.disableSensor();
        this.sensors.enableSensor("TEMPERATURE");
        const temp = await this.startTemp();
        this.sensors.disableSensor();
        const gyro = await this.startGyroscope();
        const loc = await this.startLocate();

        const deci = this.decibel;
        const bat = this.battery;
        const time = Date.now();

        console.log("lux :" + lux, "gyro :" + gyro, "loc :" + loc, "deci :" + deci, "bat :" + bat, "time :" + time, "temp : " + temp);
    }




}
