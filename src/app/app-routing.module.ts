import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { CompanyUserAddComponent } from './companies/company-user-add/company-user-add.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'company', component: CompaniesComponent },
  { path: 'company/:id', component: CompanyEditComponent },
  { path: 'company/userAdd/:id', component: CompanyUserAddComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
