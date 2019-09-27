import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'triviaAdmin';
  loggedIn: boolean = false;
  loggedInUser = JSON.parse(localStorage.getItem("triviaAdmin"));
  userRole = JSON.parse(localStorage.getItem("userRole"));
  constructor(private cdRef: ChangeDetectorRef, private router: Router, public auth: LoginService) { }

  ngOnInit() {
    setTimeout(()=>{

      this.doInit()
    },1000)
  }
doInit(){
  this.loggedInUser = JSON.parse(localStorage.getItem("triviaAdmin"));
  this.userRole = JSON.parse(localStorage.getItem("userRole"));
  
  console.log("init calles----", JSON.parse(localStorage.getItem("userRole")));
    // this.cdRef.detectChanges();
  if (this.loggedInUser) {
    this.loggedIn = true;
  } else {
    this.loggedIn = false;
  }
}
  Logout() {
    localStorage.clear();
    // localStorage.removeItem("triviaAdmin");
    this.loggedIn = false;
    			setTimeout(function () { window.location.reload() }, 1);
    this.router.navigate(['/login']);
  }
}
