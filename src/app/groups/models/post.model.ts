export class Post {
	postID: number;
	subject: string;
	content: string;
	fotoURL: string;
	 constructor(postID: number, subject: string, content: string, fotoURL: string){
		this.postID = postID;
		this.subject = subject;
		this.content = content;
		this.fotoURL = fotoURL;
		} 
}
