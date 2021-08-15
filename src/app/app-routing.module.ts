import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { CompanyUserAddComponent } from './companies/company-user-add/company-user-add.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupAddComponent } from './groups/group-add/group-add.component';
import { GroupEditPostComponent } from './groups/group-edit-post/group-edit-post.component';
import { GroupAddReplyPostComponent } from './groups/group-add-reply-post/group-add-reply-post.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '',redirectTo:'/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'company', component: CompaniesComponent, canActivate: [AuthGuard] },
  { path: 'company/:id', component: CompanyEditComponent, canActivate: [AuthGuard] },
  { path: 'company/userAdd/:id', component: CompanyUserAddComponent, canActivate: [AuthGuard] },  
  { path: 'group/:id', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'group/add/:id', component: GroupAddComponent, canActivate: [AuthGuard] },
  { path: 'group/edit-post/:id', component: GroupEditPostComponent, canActivate: [AuthGuard] },
  { path: 'group/add-reply/:id', component: GroupAddReplyPostComponent, canActivate: [AuthGuard] }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
