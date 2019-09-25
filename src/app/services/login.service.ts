import { Injectable } from '@angular/core';
import {Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import {config} from '../config';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	toast: any;
	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}
	
	constructor(private http: HttpClient) { }

	authorize(detail){
		console.log(detail);
		return this.http.post(config.baseApiUrl + "login", detail);
	}

	sendToken(detail: string){
		localStorage.setItem("triviaAdmin", detail)
	}
	getToken() {
		return localStorage.getItem("triviaAdmin")
	}
	isLoggednIn() {
		return this.getToken() !== null;
	}   
}
