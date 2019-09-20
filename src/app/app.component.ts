import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'triviaAdmin';
  loggedIn: boolean = false;
  loggedInUser: any;
  userRole : any;
  constructor(private cdRef: ChangeDetectorRef, private router:Router,public auth: LoginService){}

  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage.getItem("triviaAdmin"));
    var accessToken = JSON.parse(localStorage.getItem("triviaAdmin")).data.accessToken;
    var base64Url = accessToken.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var decodedToken = JSON.parse(window.atob(base64));
    this.userRole = decodedToken.customer.userRole;
    console.log(this.userRole);

    this.cdRef.detectChanges();
    if(this.loggedInUser){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }	
  }

  Logout(){
    localStorage.removeItem("triviaAdmin");
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
