import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../groups/models/post.model';

const AUTH_API = 'https://localhost:44348/api/Posts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
  getPosts(): Observable<any> {
    return this.http.get(AUTH_API  , httpOptions);
  }
  create(post: Post): Observable<any> {
    return this.http.post(AUTH_API , post , httpOptions);
  }

  update(postID: number, post: Post) {
		return this.http.put<Post>(AUTH_API + postID, post);
	}
  
  AddPostToUserAndGroup(postID: number, userID: number, groupID: number) {
		return this.http.post<Post>(AUTH_API + '/AddPostToUserAndGroup?postID=' + postID + '&userID=' + userID + '&groupID=' + groupID, httpOptions);
	}

  
}
