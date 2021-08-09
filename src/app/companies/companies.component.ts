import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../_services/company.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { NgxImageCompressService } from 'ngx-image-compress';



@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  form: any = {
    nameCompany: null,
    description: null,
    location: null,
    companyManagerID: null
  };
  companyID: any;
  nameCompany: any;
  description: any;
  location: any;
  companyManager: any;
  errorMessage: any;
  isSuccessful = false;
  isFoutGegaan = false;
  currentUser: any;
  isChecked = true;
  fotoURL: any;
  msg: string;
  file: any;
  localCompressedURl:any;
  isWerknemers: boolean;
  firstName: any;
  lastName: any;
  echteData: any;
  isGroepen: boolean;
  




  constructor(private companyService: CompanyService, private token: TokenStorageService, private imageCompress: NgxImageCompressService) { }
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

  async ngOnInit(): Promise<void> {
    this.currentUser = this.token.getUser();
    this.companyService.checkManager(this.currentUser.userID).subscribe(
      data => {
        this.isChecked = true;
        var realData = JSON.parse(data);
        this.nameCompany = realData["nameCompany"];
        this.description = realData["description"];
        this.location = realData["location"];
        this.companyManager = this.currentUser.firstName;
        this.companyID = realData["companyID"];
        console.log(this.companyID);
        this.reloadPage();
      },
      err => {
        this.isChecked = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    const check = await this.companyService.checkManager(this.currentUser.userID).toPromise();
    let checkJSON = JSON.parse(check);
    this.companyID = checkJSON["companyID"];


    this.companyService.GetWerknemers(this.companyID).subscribe(
      data => {
        this.isWerknemers = true;
        this.echteData = JSON.parse(data);
      },
      err => {
        this.isWerknemers = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );

    this.companyService.GetGroepen(this.companyID).subscribe(
      data => {
        this.isGroepen = true;
        this.echteData = JSON.parse(data);
      },
      err => {
        this.isGroepen = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    
  }

  onSubmit(): void {
    const { nameCompany, description, location } = this.form;

    this.companyService.create(nameCompany, description, location, this.currentUser.userID, this.fotoURL).subscribe(
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
