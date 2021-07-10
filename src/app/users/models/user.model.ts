import { Role } from '../../roles/models/role.model'; 

export class User {
    UserID: number;
	FirstName: string;
    LastName: string;
	Email: string;
	Username: string;
	Password: string;
	FotoURL: string;
	Function: string;
    LinkedInURL: string;
    RoleID: number;
    Role: Role;

	 constructor(UserID: number, FirstName: string, LastName: string, Email: string, Username: string, Password: string, FotoURL: string, Function: string, LinkedInURL:string, RoleID: number, Role: Role){
		this.UserID = UserID;
		this.FirstName = FirstName;
		this.LastName = LastName;
		this.Email = Email;
		this.Username = Username;
		this.Password = Password;
		this.FotoURL = FotoURL;
        this.Function = Function;
        this.LinkedInURL = LinkedInURL;
        this.RoleID = RoleID;
        this.Role = Role;
		} 
}
