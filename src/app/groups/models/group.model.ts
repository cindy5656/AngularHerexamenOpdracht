import { User } from '../../users/models/user.model'; 

export class Group {
	groupID: number;
	nameGroup: string;
	fotoURL: string;
	theme: string;
	 constructor(groupID: number, nameGroup: string, fotoURL: string, theme: string){
		this.groupID = groupID;
		this.nameGroup = nameGroup;
		this.fotoURL = fotoURL;
		this.theme = theme;
		} 
}
