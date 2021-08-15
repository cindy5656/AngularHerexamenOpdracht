import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../groups/models/reply.model';

const AUTH_API = 'https://localhost:44348/api/Reply';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
  GetRepliesByPost(postID: number): Observable<any> {
    return this.http.get(AUTH_API  + '/GetRepliesByPost/'+ postID , httpOptions);
  }
  create(reply: Reply): Observable<any> {
    return this.http.post(AUTH_API , reply , httpOptions);
  }

  update(replyID: number, reply: Reply) {
		return this.http.put<Reply>(AUTH_API + '/' + replyID, reply);
	}
  
  deleteReply(ReplyID: number) {
		return this.http.delete<Reply>(AUTH_API + '/' + ReplyID);
	}

}
