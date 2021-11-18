import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 // import { IonicStorageModule } from '@ionic/storage-angular';
 //import { IonicStorageModule } from '@ionic/storage';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Events } from "./event/events.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
  //IonicStorageModule.forRoot(), 
  FormsModule, ReactiveFormsModule,
  ],
  providers: [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
  Events, NativeGeocoder, Geolocation,Storage,DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
