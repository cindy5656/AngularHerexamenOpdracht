import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompanyService } from 'src/app/_services/company.service';
import { PostService } from 'src/app/_services/post.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { GroupService } from '../group.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-group-get-posts',
  templateUrl: './group-get-posts.component.html',
  styleUrls: ['./group-get-posts.component.scss']
})
export class GroupGetPostsComponent implements OnInit {
  currentUser: any;
  isPostByUser: boolean;
  echteData: any;
  isFoutGegaan: boolean;
  errorMessage: any;
  groupID: any;
  isGeliked: boolean;
  isDisliked: boolean;
  postID: any;

  constructor(private companyService: CompanyService, 
    private token: TokenStorageService, 
    private imageCompress: NgxImageCompressService, 
    private groupService: GroupService, 
    private route: ActivatedRoute,
    private postService: PostService) { }

  async ngOnInit(): Promise<void> {
    this.groupID = this.route.snapshot.paramMap.get("id");
    this.currentUser = this.token.getUser();
    this.postService.GetPostsByGroup(this.groupID).subscribe(
      data => {
        this.echteData = JSON.parse(JSON.stringify(data));
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    this.postService.GetPostsByUser(this.currentUser.userID).subscribe(
      data => {
        this.isPostByUser = true;
      },
      err => {
        this.isPostByUser = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    const check = await this.postService.GetPostsByGroup(this.groupID).toPromise();
    let checkJSON = JSON.parse(JSON.stringify(check));
    this.postID = checkJSON["postID"];

    this.postService.CheckIfPostLikedByUser(this.currentUser.userID).subscribe(
      data => {
        this.isGeliked = true;
      },
      err => {
        this.isGeliked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    this.postService.CheckIfPostDislikedByUser(this.currentUser.userID).subscribe(
      data => {
        this.isDisliked = true;
      },
      err => {
        this.isDisliked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    
  }

  deletePost(postID: number) {
    this.postService.deletePost(postID).subscribe(
      data => {
        this.postService.DeletePostFromUserAndGroup(postID).subscribe(
          data => {this.reloadPage()          },
          err => {
            this.isFoutGegaan = true;
            this.errorMessage = err.error.message;
          }
        );
    
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );

  }

  incrementLikes(postID: number, Post: Post) {
    Post.aantalLikes +=1;
    this.postService.update(postID, Post).subscribe(
      data => {
           this.isGeliked = true;
      },
      err => {
        this.isGeliked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    this.postService.PostLikedBy(postID, this.currentUser.userID).subscribe(
      data => {
           this.isGeliked = true;
      },
      err => {
        this.isGeliked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
  }
  incrementDislikes(postID: number, Post: Post) {
    Post.aantalDislikes +=1;
    this.postService.update(postID, Post).subscribe(
      data => {
          this.isDisliked = true;       
           
      },
      err => {
        this.isDisliked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    this.postService.PostDislikedBy(postID, this.currentUser.userID).subscribe(
      data => {
           this.isDisliked = true;
      },
      err => {
        this.isDisliked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );

  }
  reloadPage() {
    window.location.reload();
  }

}
