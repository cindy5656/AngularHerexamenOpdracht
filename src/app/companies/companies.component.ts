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
  companyID: any;
  nameCompany: any;
  description: any;
  location: any;
  companyManager: any;
  errorMessage: any;
  isSuccessful = false;
  isFoutGegaan = false;
  currentUser: any;
  isChecked: any;
  fotoURL: any;
  msg: string;



  constructor(private companyService: CompanyService, private token: TokenStorageService) { }
  selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.currentUser.fotoURL = reader.result; 
		}
	}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.companyService.checkManager(this.currentUser.userID).subscribe(
      data => {
        this.isChecked = true;
        var realData = JSON.parse(data);
        this.nameCompany = realData["nameCompany"];
        this.description = realData["description"];
        this.location = realData["location"];
        this.companyManager = this.currentUser.firstName;
        this.companyID = realData["companyID"];
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

    this.companyService.create(nameCompany, description, location, this.currentUser.userID, this.fotoURL).subscribe(
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
