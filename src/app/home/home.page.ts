import { Component, OnInit } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController } from '@ionic/angular';
 import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { host } from '../../environments/environment';
import { image_path } from '../../environments/environment';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
declare var window: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  locationCordinates: any;
  timestamp: any;
  address:any;
constructor(
	//public http: Http,
   public navCtrl: NavController, 
  public storage: Storage,
   public loadingController: LoadingController,
   public alertController: AlertController,
   private menu: MenuController,
   public nativeGeocoder: NativeGeocoder, 
   private locationAccuracy: LocationAccuracy,
   private geolocation: Geolocation,    
   private androidPermissions: AndroidPermissions,
   private batteryStatus: BatteryStatus,
    
   ) {
    this.locationCordinates = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timestamp = Date.now();
   }
   ionViewWillEnter(){
    this.batteryStatus.onChange().subscribe(status => {
      //console.log('batteryStatus', status.level);
      // if(this.user_id != 0){
      //   this.authService.postData({'status':status.level, 'user_id':this.user_id, 'app_version': this.current_app_version}, 'changeBatteryStatus').then((result:any) => {});
      // }
    });
   // console.log("Outer")
//    if (window.cordova) {
//     cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
//         alert("Location is " + (enabled ? "enabled" : "disabled"));
//     }, function(error) {
//         alert("The following error occurred: " + error);
//     });
// }
   this.getLocation();
   this.checkPermission();
   }


  ngOnInit() {
    
  
  }
openMenu() {
   this.menu.open();
 }
 checkPermission() {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    result => {
      if (result.hasPermission) {
        this.enableGPS();
        //console.log(result.hasPermission);
      } else {
        this.locationAccPermission();
        //console.log(222);
      }
    },
    error => {
      alert(error);
    }
  );
}

locationAccPermission() {
  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    if (canRequest) {
      //console.log(222);
    } else {
      //console.log(123);
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
        .then(
          () => {
            this.enableGPS();
          },
          error => {
            //alert(error)
          }
        );
    }
  });
}

enableGPS() {
  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    () => {
      this.currentLocPosition()
    },
    error => alert('Please enable your GPS location')
    //1+JSON.stringify(error)
  );
}

currentLocPosition() {
 
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      // let data = {'pincode':result[0].postalCode, 'userId':10, 'type':'location', 'lat':this.latitude, 'lng': this.longitude}
     // console.log(result[0])
     this.address=result[0].thoroughfare+','+result[0].postalCode+','+result[0].subAdministrativeArea
        +','+result[0].administrativeArea +','+result[0].countryName;
    }).catch((error: any) => console.log(error));
   }).catch((error) => {
     console.log('Error getting location', error);
   });
}
getLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      // let data = {'pincode':result[0].postalCode, 'userId':10, 'type':'location', 'lat':this.latitude, 'lng': this.longitude}
     // console.log(result[0]);
      this.address=result[0].thoroughfare+','+result[0].postalCode+','+result[0].subAdministrativeArea
      +','+result[0].administrativeArea +','+result[0].countryName;
    }).catch((error: any) => console.log(error));
   }).catch((error) => {
     console.log('Error getting location', error);
   });
}

}
