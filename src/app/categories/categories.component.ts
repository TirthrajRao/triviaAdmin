import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {CategoryService} from '../services/category.service';
import  * as _  from 'lodash';
import {Categories} from './categories';
import {config} from '../config';
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	file:any =[];
	category_array: Categories[];
	singleCat: [];
	error = '';
	mediaPath = config.mediaApiUrl;
	url: any;
	constructor( public _categoryService:CategoryService) { }

	ngOnInit() {
		this.getCategories();
	}

	category_form = new FormGroup({
		categoryTitle: new FormControl('', Validators.required),
		categoryImage: new FormControl('', Validators.required),
	});

	editcatr_form = new FormGroup({
		categoryTitle: new FormControl('', Validators.required),
		categoryImage: new FormControl('', Validators.required),
	});


	categories = {
		categoryTitle: "",
		categoryImage: ""
	}

	resetUpdateForm(){
		this.editcatr_form.reset();
		this.getCategories();
	}

	//get all category
	getCategories(): void{
		this._categoryService.getAll().subscribe(
			(res: Categories[]) => {
				this.category_array = res;
				console.log(this.category_array);
			},
			(err) => {
				this.error = err;
			});
	}

	// add category
	addCategory(){
		const dataAdd = new FormData();
		_.forOwn(this.category_form.value, (value, key) => {
			dataAdd.append(key, value);
		});

		if (this.file.length > 0) {
			console.log("=========this", this.file)
			for (let i = 0; i <= this.file.length; i++) {
				dataAdd.append('categoryImage', this.file[i]);
			}
		}

		this._categoryService.addCategory(dataAdd).subscribe((res:any)=>{
			console.log("res=========>",res);
			this.category_form.reset();
			this.getCategories();
		},
		err=>{
			console.log(err);
		})
	}

	cat_image(event){
		this.file = event.target.files;
	}

	//get data for edit
	editCat(category){
		console.log(category);
		this.singleCat = category;
	}

	//delete category
	deleteCategory(categoryId){
		this._categoryService
		.deleteCategory(categoryId)
		.subscribe(() => {
			this.getCategories();
		})
	}


	//for upadting the category
	updateCat(singleCat){

		const data = new FormData();
		_.forOwn(this.editcatr_form.value, (value, key) => {
			data.append(key, value);
		});

		if (this.file.length > 0) {
			console.log("=========this", this.file)
			for (let i = 0; i <= this.file.length; i++) {
				data.append('categoryImage', this.file[i]);
			}
		}

		this._categoryService.updateCategory(data, singleCat.categoryId).subscribe((res:any)=>{
			console.log("res=========>",res);
			this.editcatr_form.reset();
			this.getCategories();
		},
		err=>{
			console.log(err);
		})
	}

	// for image preview on edit click
	public addFile(event: any) {
		this.file = event.target.files;
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event: any) => {
				this.url = event.target.result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}
}
