import { Component, OnInit } from '@angular/core';
import { GroupService } from './group.service'; 

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
 export class GroupsComponent implements OnInit {
	groups: string[];
constructor(private _groupService: GroupService) {
	this.groups = this._groupService.getGroups();
} 	  
	  

  ngOnInit(): void {
  }

}
