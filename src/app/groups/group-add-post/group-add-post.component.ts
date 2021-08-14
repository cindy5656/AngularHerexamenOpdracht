import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompanyService } from 'src/app/_services/company.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { PostService } from 'src/app/_services/post.service';
import { GroupService } from '../group.service';
import {Post} from '../models/post.model'

@Component({
  selector: 'app-group-add-post',
  templateUrl: './group-add-post.component.html',
  styleUrls: ['./group-add-post.component.scss']
})
export class GroupAddPostComponent implements OnInit {
  msg: string;
  file: any;
  localCompressedURl: string;
  currentUser: any;
  isLid: boolean;
  realData: any;
  form: any = {
    subject: null,
    content: null,
    fotoURL: null,
  };
  isSuccessful: boolean;
  isFoutGegaan: boolean;
  errorMessage: any;
  groupID: any;

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

    
    async ngOnInit(): Promise<void> {
      this.groupID = this.route.snapshot.paramMap.get("id");
      console.log(this.groupID);
      this.companyService.GetCompanyFromGroup(Number(this.groupID)).subscribe(
        data => {
          this.realData = JSON.parse(data);
          console.log('get company from group');
          console.log(this.realData);
        },
        err => {
        }
      );
      const check = await this.companyService.GetCompanyFromGroup(Number(this.groupID)).toPromise();
      let checkJSON = JSON.parse(check);
      var companyID = checkJSON["companyID"];
      console.log(companyID);
      console.log(this.groupID);
      this.currentUser = this.token.getUser();
      this.companyService.GetLeden(Number(this.groupID), companyID).subscribe(
        data => {
          var realData = JSON.parse(data);
          console.log(realData);
          for (let real of realData) {
            if(real["userID"] == this.currentUser.userID) {
            this.isLid = true;
            break;
          }
          else {
            this.isLid = false;
          }
          }
        },
        err => {
          this.isLid = false;
        }
      );      
    }

    onSubmit(): void {
      const { subject, content, fotoURL } = this.form;
      let post = new Post(0, subject, content, fotoURL);
      console.log(post);
      this.postService.create(post).subscribe(
        data => {
          this.isSuccessful = true;
          var JSONData = JSON.parse(JSON.stringify(data));
          console.log(JSONData["postID"]);
          this.postService.AddPostToUserAndGroup(JSONData["postID"], this.currentUser.userID, Number(this.groupID)).subscribe(
            data => {
              var JSONData2 = JSON.stringify(data);
    
      
              console.log(JSONData2);
              this.reloadPage();
            },
            err => {
              this.isFoutGegaan = true;
              this.errorMessage = err.error.message;
            }
          );

  
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
