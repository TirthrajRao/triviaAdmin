import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loggedInUser: any;
	constructor(private loginService: LoginService, private router: Router) {
		this.loggedInUser = JSON.parse(localStorage.getItem("triviaAdmin"));
		console.log(this.loggedInUser);
		if (this.loggedInUser) {
			this.router.navigate(['/dashboard']);
		}
	}
	submitted = false;
	msg: string = null;
	errmsg: string = null;


	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
	});

	admin = {
		email: "",
		password: ""
	}

	ngOnInit() {
	}

	login(detail) {
		this.loginService.authorize(detail).subscribe((res: any) => {
			console.log("login user response", res);
			localStorage.setItem("userRole", JSON.stringify(res.data.userRole));
			localStorage.setItem("triviaAdmin", JSON.stringify(res.data.accessToken));
			this.msg = 'Logged in successfully! ';
			this.router.navigate(['/dashboard']);
			// setTimeout(function () { window.location.reload() }, 1);
		}, err => {
			console.log("error", err);
			this.errmsg = 'Incorrect info!';
		})
	}
}
