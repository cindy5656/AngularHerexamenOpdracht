import { Injectable } from '@angular/core';
import { Group } from './models/group.model';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';


@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }
   getGroups(): Observable<Group[]> {
	return this.http.get<Group[]>("https://localhost:44348/api/Group"); 
		}

  addGroup(group: Group) {
		return this.http.post<Group>("https://localhost:44348/api/Group", group);
	} 
  updateGroup(groupID: number, group: Group) {
		return this.http.put<Group>("https://localhost:44348/api/Group/" + groupID, group);
	}

	 deleteGroup(groupID: number) {
		return this.http.delete<Group>("https://localhost:44348/api/Group/" + groupID);
	} 
}
