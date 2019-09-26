import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private router: Router) {

	}

	userRole= localStorage.getItem("adminRole");


	canActivate(): boolean {

		console.log("localstorage admin details ", this.userRole);

		if (JSON.parse(localStorage.getItem("triviaAdmin"))) {
			if (this.userRole) {
				return true;
			} else {
				this.router.navigate(['/login'])
				return false;
			}
		}
	}
}