import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { image_path } from '../environments/environment';
import { logval } from '../environments/environment';
import { Events } from 'src/app/event/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
page:any;
 userDetails: any;
 imag_path=image_path;
 logval=logval.production;
  text: string;
  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private menu: MenuController,
    private navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    
  )  {
     
  }
  
    ngOnInit() {
       this.getUserDetails();
   // this.storage.create();
    
      
    this.events.subscribe('user:login', (data) => {
      
      //console.log(data);
      if(data){
        this.getUserDetails();
      }
     
    });
  }

  getUserDetails() {
    this.storage.create();
   this.storage.get("userDetails").then(val=>{
      if(val){
        this.userDetails = val.response_data;
        //console.log(val);
      }else{
        this.userDetails = null;
      }
    })

  }
logout(){

    this.storage.remove("userDetails");
    //.then(() => { this.events.publish('user:login', false) });
    this.userDetails = null;
    this.navCtrl.navigateForward('home');
     this.menu.close();
     //this.events.publish('user:logout', true);
  }
  close(){
    this.menu.close();
  }
 
 
}
