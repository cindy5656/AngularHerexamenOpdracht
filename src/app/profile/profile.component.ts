import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
	msg = "";
  form: any = {
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    functionCompany: null,
    linkedInURL: null
  };
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  file: any;
  localCompressedURl:any;



  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private imageCompress: NgxImageCompressService) { }
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
			this.currentUser.fotoURL = reader.result; 
      this.compressFile(this.currentUser.fotoURL,fileName)
		}
	}
  compressFile(image,fileName) {
    var orientation = -1;
    console.warn('Size in bytes is now:',  this.imageCompress.byteCount(image)/(1024*1024));
    this.imageCompress.compressFile(image, orientation, 25, 25).then(
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
    this.currentUser = this.tokenStorage.getUser();
    this.form.firstName = this.currentUser.firstName;
    this.form.lastName = this.currentUser.lastName;
    this.form.username = this.currentUser.username;
    this.form.email = this.currentUser.email;
    this.form.linkedInURL = this.currentUser.linkedInURL;
    this.form.password = this.currentUser.password;
    this.form.functionCompany = this.currentUser.functionCompany;
  }

  onSubmit(): void {
    const { firstName, lastName, email, username, password,  functionCompany, linkedInURL } = this.form;
    this.authService.update(this.currentUser.userID, firstName, lastName, email, username, password, this.localCompressedURl, functionCompany, linkedInURL, 1).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
    
  }
  reloadPage(): void {
    window.location.reload();
  }
}