import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompanyService } from 'src/app/_services/company.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { GroupService } from '../group.service';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {
  currentUser: any;
  isChecked: boolean;
  nameCompany: any;
  description: any;
  location: any;
  companyManager: any;
  companyID: any;
  isFoutGegaan: boolean;
  errorMessage: any;
  isWerknemers: boolean;
  echteData: any;
  isGroepen: boolean;
  isBeheerder: boolean;
  msg: string;
  file: any;
  localCompressedURl: string;
  form: any = {
    nameGroup: null,
    fotoURL: null,
    theme: null,
  };
  isSuccessful: boolean;

  constructor(private companyService: CompanyService, private token: TokenStorageService, private imageCompress: NgxImageCompressService, private groupService: GroupService) { }

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
    this.companyService.GetGroepenByBeheerder(this.currentUser.userID).subscribe(
      data => {
        this.isBeheerder = true;
        var realData = JSON.parse(data);
        this.form.nameGroup = realData["nameGroup"];
        this.form.fotoURL = realData["fotoURL"];
        this.form.theme = realData["theme"];
        this.reloadPage();
      },
      err => {
        this.isBeheerder = false;
        this.isFoutGegaan = true;
        this.errorMessage = err.error.message;
      }
    );
    const check = await this.companyService.checkManager(this.currentUser.userID).toPromise();
    let checkJSON = JSON.parse(check);
    this.companyID = checkJSON["companyID"];



    
  }

  onSubmit(): void {
    const { nameGroup, fotoURL, theme } = this.form;
    let groep = new Group(0, nameGroup, fotoURL, theme);
    console.log(groep);
    this.groupService.addGroup(groep).subscribe(
      data => {
        this.isSuccessful = true;
        var groupID = data.groupID;
        this.companyService.AddUserToCompany(this.companyID, this.currentUser.userID, 5, groupID ).subscribe(
          data => {
            this.isSuccessful = true;
            this.reloadPage();
          },
          err => {
            this.isFoutGegaan = true;
            this.errorMessage = err.error.message;
          });
        console.log(this.companyID);
        console.log(this.currentUser.userID);
        console.log(groupID);

        console.log(data);
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
