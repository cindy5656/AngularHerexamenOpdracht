import { User } from '../../users/models/user.model'; 

export class Group {
	GroupID: number;
	Name: string;
	FotoURL: string;
	Theme: string;
	GroupManagerID: number;
	GroupManager: User;
	GroupUsers: User;
	 constructor(GroupID: number, Name: string, FotoURL: string, Theme: string, GroupManagerID: number, GroupManager: User, GroupUsers: User){
		this.GroupID = GroupID;
		this.Name = Name;
		this.FotoURL = FotoURL;
		this.Theme = Theme;
		this.GroupManagerID = GroupManagerID;
		this.GroupManager = GroupManager;
		this.GroupUsers = GroupUsers;
		} 
}
