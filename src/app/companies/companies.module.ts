import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { CompanyService } from './company.service';



@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule
  ],
  providers: [CompanyService], 
  exports: [
    CompaniesComponent
  ]
})
export class CompaniesModule { }
