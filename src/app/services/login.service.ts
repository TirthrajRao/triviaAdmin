import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import { config } from '../config';

@Injectable({
	providedIn: 'root'
})

export class LoginService {

	userRole: any;


	toast: any;
	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}

	constructor(private http: HttpClient) { }

	authorize(detail) {
		console.log(detail);
		return this.http.post(config.baseApiUrl + "login", detail).pipe(
			map((res: any) => {
				localStorage.setItem("userRole", JSON.stringify(res.data.userRole));
				localStorage.setItem("triviaAdmin", JSON.stringify(res.data.accessToken));
				return true;
			}),
			catchError(this.handleError));
	}
	
	sendToken(detail: string) {
		localStorage.setItem("triviaAdmin", detail)
	}
	getToken() {
		return localStorage.getItem("triviaAdmin")
	}
	isLoggednIn() {
		return this.getToken() !== null;
	}
}
