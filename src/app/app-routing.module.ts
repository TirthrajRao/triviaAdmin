import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CategoriesComponent} from './categories/categories.component';
import {NewsComponent} from './news/news.component';
import {SubAdminComponent} from './sub-admin/sub-admin.component';
const routes: Routes = [
{
	path: '',
	pathMatch: "full",
	redirectTo: "dashboard"
},
{
	path: 'login',
	component: LoginComponent,
},
{
	path: 'dashboard',
	component: DashboardComponent,
	canActivate: [AuthGuard]
},
{
	path: 'categories',
	component: CategoriesComponent,
	canActivate: [AuthGuard]
},
{
	path: 'news',
	component: NewsComponent,
	canActivate: [AuthGuard]
},
{
	path: 'sub-admin',
	component: SubAdminComponent,
	canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }