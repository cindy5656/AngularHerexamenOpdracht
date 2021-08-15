export class Post {
	postID: number;
	subject: string;
	content: string;
	fotoURL: string;
	aantalLikes: number;
    aantalDislikes: number;

	 constructor(postID: number, subject: string, content: string, fotoURL: string, aantalLikes: number, aantalDislikes: number){
		this.postID = postID;
		this.subject = subject;
		this.content = content;
		this.fotoURL = fotoURL;
		this.aantalLikes = aantalLikes;
        this.aantalDislikes = aantalDislikes;

		} 
}
