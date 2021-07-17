import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../roles/models/role.model';

const AUTH_API = 'https://localhost:44348/api/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/authenticate', {
      username,
      password
    }, httpOptions);
  }

  register(firstName: string, lastName: string, email: string, username: string, password: string, fotoURL: string, functionCompany: string, linkedInURL: string, roleID: number, role: Role): Observable<any> {
    return this.http.post(AUTH_API, {
      firstName,
      lastName,
      email,
      username,
      password,
      fotoURL,
      functionCompany,
      linkedInURL,
      roleID,
      role
    }, httpOptions);
  }

  update(userID: number, firstName: string, lastName: string, email: string, username: string, password: string, fotoURL: string, functionCompany: string, linkedInURL: string, roleID: number): Observable<any> {
    console.log(AUTH_API + '/' + userID);
    return this.http.put(AUTH_API + '/' + userID, {
      userID,
      firstName,
      lastName,
      email,
      username,
      password,
      fotoURL,
      functionCompany,
      linkedInURL,
      roleID
    }, httpOptions);
  }
}
