import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompanyService } from 'src/app/_services/company.service';
import { PostService } from 'src/app/_services/post.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { GroupService } from '../group.service';
import { ReplyService } from 'src/app/_services/reply.service';
import { Reply } from '../models/reply.model'
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-group-add-reply-post',
  templateUrl: './group-add-reply-post.component.html',
  styleUrls: ['./group-add-reply-post.component.scss']
})
export class GroupAddReplyPostComponent implements OnInit {
  form: any = {
    postID: 0,
    replyContent: null
  };
  subject: any;
  content: any;
  fotoURL: any;
  replyContent: any;

  isFoutGegaan: boolean;
  errorMessage: any;
  isSuccessful: boolean;
  hasReacties: boolean;
  dataFromRepliesByPost: any;

  constructor(private companyService: CompanyService, 
    private token: TokenStorageService, 
    private imageCompress: NgxImageCompressService, 
    private groupService: GroupService, 
    private route: ActivatedRoute,
    private postService: PostService,
    private replyService: ReplyService,
    private cd : ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.form.postID = this.route.snapshot.paramMap.get("id");
    this.postService.GetPostByID(this.form.postID).subscribe(
      data => {
        var JSONData = JSON.parse(JSON.stringify(data));
        this.subject = JSONData["subject"];
        this.content = JSONData["content"];
        this.fotoURL = JSONData["fotoURL"];


        console.log(JSONData);
        console.log("subject", this.subject);
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    this.replyService.GetRepliesByPost(Number(this.form.postID)).subscribe(
      data => {
        this.hasReacties = true;
        this.dataFromRepliesByPost = JSON.parse(JSON.stringify(data));
      },
      err => {
        this.hasReacties = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
  
    }
    

    onSubmit(): void {
      const {  replyContent, postID } = this.form;
      let reply = new Reply(0, replyContent, Number(postID));
      console.log(reply);
      this.replyService.create(reply).subscribe(
        data => {
          this.isSuccessful = true;
          var JSONData = JSON.parse(JSON.stringify(data));
          console.log(JSONData["postID"]);
          this.replyService.GetRepliesByPost(Number(JSONData["postID"])).subscribe(
            data => {
              this.hasReacties = true;
              var JSONData = JSON.parse(JSON.stringify(data));
              
              console.log(JSONData);
              this.reloadPage();
            },
            err => {
              this.hasReacties = false;
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
    reloadPage() {
      window.location.reload();
      
    }

  

}
