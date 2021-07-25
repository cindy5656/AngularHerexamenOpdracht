import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompanyService } from 'src/app/_services/company.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  form: any = {
    nameCompany: null,
    description: null,
    location: null,
    companyManagerID: null
  };
  errorMessage: any;
  isSuccessful = false;
  isFoutGegaan = false;
  currentUser: any;
  isChecked: any;
  companyID: any;
  msg: string;
  fotoURL: any;
  file: any;
  localCompressedURl:any;
  constructor(private companyService: CompanyService, private token: TokenStorageService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.companyService.checkManager(this.currentUser.userID).subscribe(
      data => {
        this.isChecked = true;
        var realData = JSON.parse(data);
        this.form.nameCompany = realData["nameCompany"];
        this.form.description = realData["description"];
        this.form.location = realData["location"];
        this.form.companyManager = this.currentUser.firstName;
        this.companyID = realData["companyID"];
        this.fotoURL = realData["fotoURL"];
        this.reloadPage();
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
  }

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
			this.fotoURL = reader.result; 
      this.compressFile(this.fotoURL,fileName)
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

  onSubmit(): void {
    const { nameCompany, description, location } = this.form;
    console.log(this.fotoURL);
    console.log(this.localCompressedURl);
    this.companyService.update(this.companyID,nameCompany, description, location, this.localCompressedURl, this.currentUser.userID).subscribe(
      data => {
        this.isSuccessful = true;
        this.reloadPage();
      },
      err => {
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
  }
  reloadPage() {
  }

}
