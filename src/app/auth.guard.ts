import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	userRole = JSON.parse(localStorage.getItem("userRole"));
	accessToken = JSON.parse(localStorage.getItem("triviaAdmin"));

	constructor(private router: Router) {
	}



	canActivate(): boolean {
		console.log("localstorage admin details ", this.userRole);
		if (this.accessToken) {
			return true
		} else {
			this.router.navigate(['/login'])
			return false;
		}
	}
}

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	userRole = JSON.parse(localStorage.getItem("userRole"));
	accessToken = JSON.parse(localStorage.getItem("triviaAdmin"));

	constructor(private router: Router) {
	}



	canActivate(): boolean {
		console.log("localstorage admin details ", this.userRole);
		if (this.accessToken) {
			if (this.userRole === 'admin') {
				return true;
			} else {
				Swal.fire({
					type: 'warning',
					title: 'unauthorised access',
					showConfirmButton: false,
					timer: 2000
				})
				alert('unauthorised access');
				return false;
			}
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}