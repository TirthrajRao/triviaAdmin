import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {CategoryService} from '../services/category.service';
import  * as _  from 'lodash';
import {config} from '../config';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  subadminForm = new FormGroup({
		subadminEmail: new FormControl('', Validators.required),
		subadminName: new FormControl('', Validators.required),
		subadminPassword: new FormControl('', Validators.required),
	});

}
