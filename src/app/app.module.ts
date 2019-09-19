import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './services/login.service';
import { CategoryService } from './services/category.service';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
  AppComponent,
  LoginComponent,
  DashboardComponent,
  CategoriesComponent,
  NewsComponent,
  SubAdminComponent
  ],
  imports: [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  CKEditorModule
  ],
  providers: [LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
