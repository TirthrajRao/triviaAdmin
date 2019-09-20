import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import  * as _  from 'lodash';
import {config} from '../config';
import {NewsService} from '../services/news.service';
import {News} from '../news/news';
import {SubAdmin} from '../sub-admin/sub-admin';
import {SubAdminService} from '../services/sub-admin.service';

@Component({
	selector: 'app-user-status',
	templateUrl: './user-status.component.html',
	styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
	fileNews:any =[];
	error = '';
	mediaPath = config.mediaApiUrl;
	news_array: News[];
	user_array: SubAdmin[];
	url: any;
	config: any;
	constructor(public _newsService: NewsService,public _userService: SubAdminService) { }
	userCount : any;
	ngOnInit() {
		this.getAllUsers();
	}

	//get count of users
	getAllUsers(): void{
		this._userService.getAllUsers().subscribe(
			(res: SubAdmin[]) => {
				this.user_array = res;
				this.userCount = res.length;
				console.log(this.user_array);
			},
			(err) => {
				this.error = err;
			});
	}
}
