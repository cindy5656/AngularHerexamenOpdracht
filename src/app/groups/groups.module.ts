import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupService } from './group.service'; 


@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule
  ],
 providers: [GroupService], 
 exports: [GroupsComponent] 
})
export class GroupsModule { }
