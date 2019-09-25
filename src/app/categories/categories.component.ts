import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import * as _ from 'lodash';
import { Categories } from './categories';
import { config } from '../config';
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	file: any = [];
	category_array: Categories[];
	singleCat: [];
	error = '';
	mediaPath = config.mediaApiUrl;
	url: any;
	catdata: any;
	constructor(public _categoryService: CategoryService) { }

	ngOnInit() {
		this.getCategories();
	}

	category_form = new FormGroup({
		categoryTitle: new FormControl('', Validators.required),
	});

	editcatr_form = new FormGroup({
		categoryTitle: new FormControl('', Validators.required),
	});

	categories = {
		categoryTitle: "",
	}

	resetUpdateForm() {
		this.editcatr_form.reset();
		this.getCategories();
	}

	//get all category
	getCategories(): void {
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
	addCategory(data) {
		console.log('Data:', data);
		this._categoryService.addCategory(data).subscribe((res: any) => {
			this.category_form.reset();
			this.getCategories();
		}, err => {
			console.log(err);
		})
	}

	cat_image(event) {
		this.file = event.target.files;
	}

	//get data for edit
	editCat(category) {
		console.log(category);
		this.singleCat = category;
	}

	//delete category
	deleteCategory(categoryId) {
		this._categoryService
			.deleteCategory(categoryId)
			.subscribe(() => {
				this.getCategories();
			})
	}


	//for upadting the category
	updateCat(singleCat) {

		console.log('Single cat:', singleCat);

		this.catdata = {
			categoryTitle: singleCat.categoryTitle,
			categoryId: singleCat.categoryId
		}
		
		this._categoryService.updateCategory(this.catdata).subscribe((res: any) => {
			console.log("res=========>", res);
			this.editcatr_form.reset();
			this.getCategories();
		},
			err => {
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
