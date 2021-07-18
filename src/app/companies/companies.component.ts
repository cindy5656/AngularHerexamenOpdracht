import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../_services/company.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  form: any = {
    nameCompany: null,
    description: null,
    location: null,
    companyManagerID: null
  };
  errorMessage: any;
  isSuccessful = false;
  isFoutGegaan = false;
  currentUser: any;
  isChecked: any;



  constructor(private companyService: CompanyService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.companyService.checkManager(this.currentUser.userID).subscribe(
      data => {
        this.isChecked = true;
        this.reloadPage();
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    
  }

  onSubmit(): void {
    const { nameCompany, description, location } = this.form;

    this.companyService.create(nameCompany, description, location, this.currentUser.userID).subscribe(
      data => {
        this.isSuccessful = true;
        this.reloadPage();
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
  }
  reloadPage() {
  }

}
