import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Role } from '../roles/models/role.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { firstName, lastName, email, username, password, fotoURL, functionCompany, linkedInURL } = this.form;

    this.authService.register(firstName, lastName, email, username, password, fotoURL, functionCompany, linkedInURL, 1, null).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
