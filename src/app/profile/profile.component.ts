import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  url: any; 
	msg = "";
  form: any = {
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    fotoURL: null,
    functionCompany: null,
    linkedInURL: null
  };
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';


  constructor(private token: TokenStorageService, private authService: AuthService) { }
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
			this.url = reader.result; 
		}
	}
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.form.firstName = this.currentUser.firstName;
    this.form.lastName = this.currentUser.lastName;
    this.form.username = this.currentUser.username;
    this.form.email = this.currentUser.email;
    this.form.linkedInURL = this.currentUser.linkedInURL;
    this.form.password = this.currentUser.password;
    this.form.fotoURL = this.currentUser.fotoURL;
    this.form.functionCompany = this.currentUser.functionCompany;
  }

  onSubmit(): void {
    const { firstName, lastName, email, username, password, fotoURL, functionCompany, linkedInURL } = this.form;
    this.authService.update(this.currentUser.userID, firstName, lastName, email, username, password, fotoURL, functionCompany, linkedInURL, 1).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
  }
}