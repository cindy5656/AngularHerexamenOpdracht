import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './group.service'; 
import { Group } from './models/group.model'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
 export class GroupsComponent implements OnInit {
	groups: Group[];
	groupID: any;
	isBestaandeGroep: boolean = null;
 constructor(private _groupService: GroupService, private route: ActivatedRoute) {
	this.groupID = this.route.snapshot.paramMap.get("id");

	
		
}

	 	addGroup() {
			//let groupToAdd = new Group(0, 'Enzo', null, null, 1, null, null);
			//this._groupService.addGroup(groupToAdd).subscribe();
		}
		updateGroup() {
			//			let groupToUpdate = new Group(1, 'Enzo', 'iets', null, 1, null, null);
			//this._groupService.updateGroup(6, groupToUpdate).subscribe();

		}
		
		 deleteGroup() {
			//this._groupService.deleteGroup(6).subscribe();
			} 


  async ngOnInit(): Promise<void> {
	 this.groups = await this._groupService.getGroups().toPromise();
	 for (let x of this.groups) {
		if (x.groupID == this.groupID) {
			this.isBestaandeGroep = true;
			break;
		}
		else {
			this.isBestaandeGroep = false;
		}
	}
	
  }

}
