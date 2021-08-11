import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

const AUTH_API = 'https://localhost:44348/api/Company';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService implements OnInit{
  form: any = {
    nameCompany: null,
    description: null,
    location: null,
    companyManagerID: null
  };


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
  create(nameCompany: string, description: string, location: string, fotoURL: string, companyManagerID: number): Observable<any> {
    return this.http.post(AUTH_API , {
      nameCompany,
      description,
      location,
      fotoURL,
      companyManagerID
    }, httpOptions);
  }

  update(companyID: number, nameCompany: string, description: string, location: string, fotoURL: string, companyManagerID: number): Observable<any> {
    return this.http.put(AUTH_API + '/' + companyID, {
      companyID,
      nameCompany,
      description,
      location,
      fotoURL,
      companyManagerID
    }, httpOptions);
  }

  AddUserToCompany(companyID: number, userID: number, roleID: number, groupID: number): Observable<any> {
    return this.http.post(AUTH_API + '/User?companyID=' + companyID + '&userID=' + userID + '&roleID=' + roleID  + '&groupID=' + groupID, {}, httpOptions);
  }

  checkManager(companyManagerID: number): Observable<any> {
    return this.http.get(AUTH_API + '/User/' + companyManagerID, { responseType: 'text' });
  }
  GetWerknemers(companyID: number): Observable<any> {
    return this.http.get(AUTH_API + '/Werknemers/' + companyID, {responseType : "text"});
  }
  GetGroepen(companyID: number): Observable<any> {
    return this.http.get(AUTH_API + '/Groepen/' + companyID, {responseType : "text"});
  }
  GetGroepenByBeheerder(userID: number): Observable<any> {
    return this.http.get(AUTH_API + '/Beheerder/' + userID, { responseType: 'text' });
  }
}
