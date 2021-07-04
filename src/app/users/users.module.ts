import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserService} from './user.service';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule
  ],
  providers: [UserService], 
  exports: [UsersComponent]
})
export class UsersModule { }
