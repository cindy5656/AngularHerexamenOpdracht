export class Group {
	GroupID: number;
	Name: string;
	FotoURL: string;
	Theme: string;
	GroupManagerID: number;
	 constructor(GroupID: number, Name: string, FotoURL: string, Theme: string, GroupManagerID: number){
		this.GroupID = GroupID;
		this.Name = Name;
		this.FotoURL = FotoURL;
		this.Theme = Theme;
		this.GroupManagerID = GroupManagerID;
		} 
}
