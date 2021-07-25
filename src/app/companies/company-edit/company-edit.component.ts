import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/_services/company.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
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
  companyID: any;
  msg: string;
  fotoURL: any;
  constructor(private companyService: CompanyService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.companyService.checkManager(this.currentUser.userID).subscribe(
      data => {
        this.isChecked = true;
        var realData = JSON.parse(data);
        this.form.nameCompany = realData["nameCompany"];
        this.form.description = realData["description"];
        this.form.location = realData["location"];
        this.form.companyManager = this.currentUser.firstName;
        this.companyID = realData["companyID"];
        this.fotoURL = realData["fotoURL"];
        this.reloadPage();
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
  }

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
			this.fotoURL = reader.result; 
		}
	}

  onSubmit(): void {
    const { nameCompany, description, location } = this.form;
    console.log(this.fotoURL);
    this.companyService.update(this.companyID,nameCompany, description, location, this.fotoURL, this.currentUser.userID).subscribe(
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
