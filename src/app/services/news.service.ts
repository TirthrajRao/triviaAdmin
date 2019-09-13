import { Injectable } from '@angular/core';
import {Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import {config} from '../config';
import {News} from '../news/news';

@Injectable({
	providedIn: 'root'
})
export class NewsService {

	newsArray: News[];

	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}

	constructor(private http: HttpClient) { }

	//add news
	addNews(data){
		return this.http.post(config.baseApiUrl + "news", data);
	}

	//fetch all news
	getAllNews(): Observable<News[]> {
		return this.http.get(config.baseApiUrl + `news`).pipe(
			map((res) => {
				this.newsArray = res['data'];
				return this.newsArray;
			}),
			catchError(this.handleError));
	}

	//delete news
	deleteNews(newsId){
		return this.http.put(config.baseApiUrl + "remove-news/" + newsId, {});
	}
}