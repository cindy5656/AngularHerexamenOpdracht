import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { HeaderComponent } from './header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { TokenStorageService } from './_services/token-storage.service';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CompanyUserAddComponent } from './companies/company-user-add/company-user-add.component';
import { AuthGuard } from './_guards/auth.guard';
import { CompanyAddRoleToUserComponent } from './companies/company-add-role-to-user/company-add-role-to-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CompaniesComponent,
    CompanyEditComponent,
    CompanyUserAddComponent,
    CompanyAddRoleToUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
	GroupsModule,
	UsersModule,
	MDBBootstrapModule.forRoot()
  ],
  providers: [authInterceptorProviders, NgxImageCompressService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit{
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

 }



