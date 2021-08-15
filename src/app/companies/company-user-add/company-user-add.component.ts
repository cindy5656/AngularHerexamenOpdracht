import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/_services/company.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-company-user-add',
  templateUrl: './company-user-add.component.html',
  styleUrls: ['./company-user-add.component.scss']
})
export class CompanyUserAddComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null
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
  isGevonden = false;
  fotoURL: any;
  msg: string;
  file: any;
  localCompressedURl:any;
  realData: any;
  isToegevoegd: boolean;


  constructor(private userService : UserService, private token: TokenStorageService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.companyService.checkManager(this.currentUser.userID).subscribe(
      data => {
        var realData = JSON.parse(data);
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
    const { firstName, lastName } = this.form;

    this.userService.getUserByName(firstName, lastName).subscribe(
      data => {
        this.realData = JSON.parse(data);

        console.log(this.realData);
        this.isSuccessful = true;
        this.isGevonden = true;
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

  onSelect(userID) {
    console.log(this.companyID);
    console.log(userID);
    this.companyService.AddUserToCompany(this.companyID, userID, 4, 0).subscribe(
      data => {
        this.isToegevoegd = true;
        this.isGevonden = true;
        this.reloadPage();
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    

  }

}
