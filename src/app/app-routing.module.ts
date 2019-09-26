import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CategoriesComponent} from './categories/categories.component';
import {NewsComponent} from './news/news.component';
import {SubAdminComponent} from './sub-admin/sub-admin.component';
import {OtherDetailsComponent} from './other-details/other-details.component';
import {PendingPostsComponent} from './pending-posts/pending-posts.component';
import {UserStatusComponent} from './user-status/user-status.component';
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
	// canActivate: [AuthGuard]
},
{
	path: 'categories',
	component: CategoriesComponent,
	canActivate: [AuthGuard]
},
{
	path: 'trivia-posts',
	component: NewsComponent,
	// canActivate: [AuthGuard]
},
{
	path: 'sub-admin',
	component: SubAdminComponent,
	canActivate: [AuthGuard]
},
{
	path: 'other-details',
	component: OtherDetailsComponent,
	canActivate: [AuthGuard]
},
{
	path: 'pending-posts',
	component: PendingPostsComponent,
	canActivate: [AuthGuard]
},
{
	path: 'user-status',
	component: UserStatusComponent,
	canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }