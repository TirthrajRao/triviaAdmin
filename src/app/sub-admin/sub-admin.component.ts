import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {SubAdminService} from '../services/sub-admin.service';
import  * as _  from 'lodash';
import {config} from '../config';
import {SubAdmin} from './sub-admin';
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {
  subadmin_array: SubAdmin[];
  error: any;
  singleSubAdmin: [];
  constructor(public _subAdminService: SubAdminService) { }

  ngOnInit() {
    this.getSubAdmin();
  }

  subadminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  editsubadminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  subadmin = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  }

  //sub admin
  addSubAdmin(data){
    this._subAdminService.addSubAdmin(data).subscribe((res:any)=>{
      this.subadminForm.reset();
      this.getSubAdmin();
    },
    err=>{
      console.log(err);
    })
  }

  //get all subadmin
  getSubAdmin(): void{
    this._subAdminService.getAll().subscribe(
      (res: SubAdmin[]) => {
        this.subadmin_array = res;
      },
      (err) => {
        this.error = err;
      });
  }

  //delete subAdmin
  deleteSubAdmin(userId){
    this._subAdminService
    .deleteSubAdmin(userId)
    .subscribe(() => {
      this.getSubAdmin();
    })
  }

  editSubAdmin(subadmin){
    this.singleSubAdmin = subadmin;
  }

  resetUpdateForm(){
    this.editsubadminForm.reset();
    this.getSubAdmin();
  }

  updateSubAdmin(subAdmin){
    console.log(subAdmin);
    this._subAdminService.updateSubAdmin(subAdmin).subscribe((res:any)=>{
      console.log("res=========>",res);
      this.editsubadminForm.reset();
      this.getSubAdmin();
    },
    err=>{
      console.log(err);
    })
  }
}