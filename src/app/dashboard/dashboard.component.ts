import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { config } from '../config';
import { NewsService } from '../services/news.service';
import { News } from '../news/news';
import { SubAdmin } from '../sub-admin/sub-admin';
import { SubAdminService } from '../services/sub-admin.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	fileNews: any = [];
	error = '';
	mediaPath = config.mediaApiUrl;
	news_array: News[];
	userRole: any;
	url: any;
	config: any;
	constructor(public _newsService: NewsService, public _userService: SubAdminService) { }
	userCount: any;
	postCount: any;
	ngOnInit() {
		this.getNews();
		this.getAllUsers();


	}


	//get all category
	getNews(): void {
		this._newsService.getAllNews().subscribe(
			(res: News[]) => {
				this.news_array = res;
				this.postCount = res.length
				console.log(this.news_array);
			},
			(err) => {
				this.error = err;
			});
	}

	//get count of users
	getAllUsers(): void {
		this._userService.getAllUsers().subscribe(
			(res: SubAdmin[]) => {
				this.userCount = res.length;
				console.log(this.userCount);
			},
			(err) => {
				this.error = err;
			});
	}
}
