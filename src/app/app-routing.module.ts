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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'company', component: CompaniesComponent },
  { path: 'company/:id', component: CompanyEditComponent },
  { path: 'company/userAdd/:id', component: CompanyUserAddComponent },  
  { path: 'group/:id', component: GroupsComponent },
  { path: 'group/add/:id', component: GroupAddComponent },
  { path: 'group/edit-post/:id', component: GroupEditPostComponent },
  { path: 'group/add-reply/:id', component: GroupAddReplyPostComponent }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
