import { Injectable } from '@angular/core';


@Injectable()
export class GroupService {

  constructor() { }
   getGroups(): string[] {
	let groups: string[] = ['IT', 'IT2', 'IT3']; 
	return groups;
		} 
}
