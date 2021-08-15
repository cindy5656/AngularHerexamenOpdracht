import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupService } from './group.service';
import { GroupAddComponent } from './group-add/group-add.component'; 
import { FormsModule } from '@angular/forms';
import { GroupAddPostComponent } from './group-add-post/group-add-post.component';
import { GroupGetPostsComponent } from './group-get-posts/group-get-posts.component';
import { GroupEditPostComponent } from './group-edit-post/group-edit-post.component';
import { GroupAddReplyPostComponent } from './group-add-reply-post/group-add-reply-post.component';



@NgModule({
  declarations: [GroupsComponent, GroupAddComponent, GroupAddPostComponent, GroupGetPostsComponent, GroupEditPostComponent, GroupAddReplyPostComponent],
  imports: [
    CommonModule, FormsModule
  ],
 providers: [GroupService], 
 exports: [GroupsComponent, GroupAddComponent, GroupAddPostComponent] 
})
export class GroupsModule { }
