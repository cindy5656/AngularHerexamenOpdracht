import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupService } from './group.service';
import { GroupAddComponent } from './group-add/group-add.component'; 
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [GroupsComponent, GroupAddComponent],
  imports: [
    CommonModule, FormsModule
  ],
 providers: [GroupService], 
 exports: [GroupsComponent, GroupAddComponent] 
})
export class GroupsModule { }
