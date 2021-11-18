import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { host } from '../../environments/environment';
import { logval } from '../../environments/environment';
import { Events } from 'src/app/event/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   isLoading = false;

 page:any;
  email: any;
  password: any;
  res: any;
  f_name: any;
  l_name: any;
  phone_number: any;
  password_confirmation: any;
  address: any;
   constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
    private menu: MenuController,
    public events: Events,
    ) { }

  ngOnInit() {
  	this.storage.create();
  }
   async login(){
const loading = await this.loadingController.create({
    message: 'Checking...'
  });
  const alert = await this.alertController.create({
     message: 'Username and Password is wrong',
      buttons: ['OK']
    });

const usernamealrt = await this.alertController.create({
     message: 'Please enter username',
      buttons: ['OK']
    });


    const passalrt = await this.alertController.create({
     message: 'Please enter password',
      buttons: ['OK']
    });


 
var headers = new HttpHeaders();
// headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');

//   headers.append('Access-Control-Allow-Origin', '*');
//   headers.append('Access-Control-Allow-Credentials', 'true');

//   headers.append('GET', 'POST');

 // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
	if(this.email == '' || this.email == null){
		 
		loading.dismiss();
		usernamealrt.present();
	}else if(this.password == '' || this.password == null){
	loading.dismiss();
	passalrt.present();
		
	}else{ 
	 await loading.present();
	var data ={
		
		"username": this.email,
		"password": this.password
    //this.password
	}

	this.http.post(host+'login', data, { headers: headers })
	.subscribe(res => {
		
		this.res = res;
    console.log(this.res);
		if(this.res.status == 0){
		loading.dismiss();
		this.alertController.create({
      
      message: this.res.message,
      buttons: ['OK']
    }).then(resalert => {

      resalert.present();

    });
		
		}else if(this.res.status == 1){
      
		this.storage.set("userDetails", this.res);
		this.storage.set("token", this.res.api_token);
		this.navCtrl.navigateForward('home');
    this.events.publish('user:login', true);
		loading.dismiss();
		}else{
		//alert("Server error");
		loading.dismiss();
		}
	}, (err) => {
		console.log(err);
		loading.dismiss();
	});

	}
}
}
