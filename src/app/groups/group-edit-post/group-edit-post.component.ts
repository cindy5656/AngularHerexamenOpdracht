import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompanyService } from 'src/app/_services/company.service';
import { PostService } from 'src/app/_services/post.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { GroupService } from '../group.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-group-edit-post',
  templateUrl: './group-edit-post.component.html',
  styleUrls: ['./group-edit-post.component.scss']
})
export class GroupEditPostComponent implements OnInit {
  form: any = {
    postID: 0,
    subject: null,
    content: null,
    fotoURL: null,
  };
  isFoutGegaan: boolean;
  errorMessage: any;
  isSchrijver: boolean;
  isSuccessful: boolean;
  msg: string;
  file: any;
  localCompressedURl: string;

  constructor(private companyService: CompanyService, 
    private token: TokenStorageService, 
    private imageCompress: NgxImageCompressService, 
    private groupService: GroupService, 
    private route: ActivatedRoute,
    private postService: PostService) { }

    selectFile(event: any) {
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        return;
      }
      var  fileName : any;
      this.file = event.target.files[0];
      fileName = this.file['name'];
  
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg = "";
        this.form.fotoURL = reader.result; 
        this.compressFile(this.form.fotoURL,fileName)
      }
    }
    compressFile(image,fileName) {
      var orientation = -1;
      console.warn('Size in bytes is now:',  this.imageCompress.byteCount(image)/(1024*1024));
      this.imageCompress.compressFile(image, orientation, 75, 75).then(
      result => {
      const imageName = fileName;// call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(result.split(',')[1]);//imageFile created below is the new compressed file which can be send to API in form data
      const imageFile = new File([result], imageName, { type: 'image/jpeg' });
      this.localCompressedURl = result;
      console.log(result);
      console.warn('Size in bytes after compression:',  this.imageCompress.byteCount(result)/(1024*1024));
      });
    }
    dataURItoBlob(dataURI) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
      }const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
      }

  ngOnInit(): void {
    this.form.postID = this.route.snapshot.paramMap.get("id");
    this.postService.GetPostByID(this.form.postID).subscribe(
      data => {
        var JSONData = JSON.parse(JSON.stringify(data));
        this.isSchrijver = true;
        this.form.subject = JSONData["subject"];
        this.form.content = JSONData["content"];
        this.form.fotoURL = JSONData["fotoURL"];


        console.log(JSONData);
        console.log("subject", this.form.subject);
      },
      err => {
        this.isSchrijver = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    }


    onSubmit(): void {
      const {postID, subject, content, fotoURL } = this.form;
      let post = new Post(Number(postID), subject, content, fotoURL);
      console.log(post);
      this.postService.update(Number(postID), post).subscribe(
        data => {
          this.isSuccessful = true;
          var JSONData = JSON.parse(JSON.stringify(data));
          console.log(JSONData["postID"]);
           
          console.log(JSONData);
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
