import { Component, OnInit } from '@angular/core';
import { GroupService } from './group.service'; 
import { Group } from './models/group.model'; 

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
 export class GroupsComponent implements OnInit {
	groups: Group[];
 constructor(private _groupService: GroupService) {
	this._groupService.getGroups().subscribe(
	result => {
		this.groups = result;
		}
	);

	
		
}
	 	addGroup() {
			let groupToAdd = new Group(0, 'Enzo', null, null, 1, null, null);
			this._groupService.addGroup(groupToAdd).subscribe();
		}
		updateGroup() {
						let groupToUpdate = new Group(1, 'Enzo', 'iets', null, 1, null, null);
			this._groupService.updateGroup(6, groupToUpdate).subscribe();

		}
		
		 deleteGroup() {
			this._groupService.deleteGroup(6).subscribe();
			} 


  ngOnInit(): void {
  }

}
