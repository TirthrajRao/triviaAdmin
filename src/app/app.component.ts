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

  constructor(private cdRef: ChangeDetectorRef, private router:Router,public auth: LoginService){}

  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage.getItem("triviaAdmin"));
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
