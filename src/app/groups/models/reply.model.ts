export class Reply {
	replyID: number;
	replyContent: string;
	postID: number;
	 constructor(replyID: number,  replyContent: string, postID: number){
		this.replyID = replyID;
		this.replyContent = replyContent;
		this.postID = postID;
		} 
}
