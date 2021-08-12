import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupService } from './group.service';
import { GroupAddComponent } from './group-add/group-add.component'; 
import { FormsModule } from '@angular/forms';
import { GroupAddPostComponent } from './group-add-post/group-add-post.component';



@NgModule({
  declarations: [GroupsComponent, GroupAddComponent, GroupAddPostComponent],
  imports: [
    CommonModule, FormsModule
  ],
 providers: [GroupService], 
 exports: [GroupsComponent, GroupAddComponent, GroupAddPostComponent] 
})
export class GroupsModule { }
