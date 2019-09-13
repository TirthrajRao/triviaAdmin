import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import  * as _  from 'lodash';
import {config} from '../config';
import {NewsService} from '../services/news.service';
import {CategoryService} from '../services/category.service';
import {Categories} from '../categories/categories';
import {News} from './news';
@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
	fileNews:any =[];
	category_array: Categories[];
	error = '';
	mediaPath = config.mediaApiUrl;
	news_array: News[];
	singleNews: [];

	constructor(public _newsService: NewsService, public _categoryService:CategoryService) { }

	ngOnInit() {
		this.getCategories();
		this.getNews();
	}

	news_form = new FormGroup({
		newsTitleEnglish: new FormControl('', Validators.required),
		newsTitleHindi: new FormControl('', Validators.required),
		newsEnglish: new FormControl('', Validators.required),
		newsHindi: new FormControl('', Validators.required),
		newsImage: new FormControl('', Validators.required),
		categoryId: new FormControl('', Validators.required),
	});

	editnews_form = new FormGroup({
		newsTitleEnglish: new FormControl('', Validators.required),
		newsTitleHindi: new FormControl('', Validators.required),
		newsEnglish: new FormControl('', Validators.required),
		newsHindi: new FormControl('', Validators.required),
		newsImage: new FormControl('', Validators.required),
		categoryId: new FormControl('', Validators.required),
	});

	resetUpdateForm(){
		this.editnews_form.reset();
		this.getNews();
	}

	news_image(event){
		this.fileNews = event.target.files;
	}

	//get all category
	getCategories(): void{
		this._categoryService.getAll().subscribe(
			(res: Categories[]) => {
				this.category_array = res;
			},
			(err) => {
				this.error = err;
			});
	}

	//get all category
	getNews(): void{
		this._newsService.getAllNews().subscribe(
			(res: News[]) => {
				this.news_array = res;
			},
			(err) => {
				this.error = err;
			});
	}

	//add news
	addNews(){
		const data = new FormData();
		_.forOwn(this.news_form.value, (value, key) => {
			data.append(key, value);
		});

		if (this.fileNews.length > 0) {
			for (let i = 0; i <= this.fileNews.length; i++) {
				data.append('newsImage', this.fileNews[i]);
			}
			
		}

		this._newsService.addNews(data).subscribe((res:any)=>{
			this.news_form.reset();
			this.getNews();
		},
		err=>{
			
		})
	}

	editNews(news){
		
		this.singleNews = news;
	}

	//delete news
	deleteNews(newsId){
		this._newsService
		.deleteNews(newsId)
		.subscribe(() => {
			this.getNews();
		})
	}
}