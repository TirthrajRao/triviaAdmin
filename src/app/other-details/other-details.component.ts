import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import  * as _  from 'lodash';
import {config} from '../config';
import {CKEditor4} from  'ckeditor4-angular';
import {SubAdminService} from '../services/sub-admin.service';
import {OtherDetails} from './otherDetails';
@Component({
	selector: 'app-other-details',
	templateUrl: './other-details.component.html',
	styleUrls: ['./other-details.component.css']
})
export class OtherDetailsComponent implements OnInit {
	config: any;
	fileLogo:any =[];
	error = '';
	mediaPath = config.mediaApiUrl;
	other_details: OtherDetails[];
	constructor(public _subAdmin: SubAdminService) { }

	details = new FormGroup({
		logo: new FormControl('', Validators.required),
		terms: new FormControl('', Validators.required),
		policy: new FormControl('', Validators.required),
	});

	ngOnInit() {
		this.config = {
			toolbar: [
			['Maximize','Bold'],
			['NumberedList', 'BulletedList'],
			['Cut', 'Copy'],
			['Undo', 'Redo']
			]
		};

		this.getOtherDetails();
	}

	otherDetails = {
		logo: "",
		terms: "",
		policy: ""
	}

	extraDetails(otherDetails){
		const data = new FormData();
		_.forOwn(this.details.value, (value, key) => {
			data.append(key, value);
		});
		console.log(this.fileLogo.length);
		if (this.fileLogo.length > 0) {
			for (let i = 0; i <= this.fileLogo.length; i++) {
				data.append('logo', this.fileLogo[i]);
			}
		}

		this._subAdmin.addOtherDetails(data).subscribe((res:any)=>{
			this.details.reset();
		},
		err=>{
			console.log(err);
		})
	}

	logoImage(event){
		this.fileLogo = event.target.files;
	}

	//get all category
	getOtherDetails(): void{
		this._subAdmin.getOtherDetails().subscribe(
			(res: OtherDetails[]) => {
				this.other_details = res;
				console.log(this.other_details);
			},
			(err) => {
				this.error = err;
			});
	}
}