import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CompanyService } from 'src/app/_services/company.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-company-add-role-to-user',
  templateUrl: './company-add-role-to-user.component.html',
  styleUrls: ['./company-add-role-to-user.component.scss']
})
export class CompanyAddRoleToUserComponent implements OnInit {
  userID: string;
  companyID: string;
  isFoutGegaan: boolean;
  errorMessage: any;
  realData: any;
  realDataUser: any;
  isBeheerder: boolean = null;

  constructor(private companyService: CompanyService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.paramMap.get("id");
    this.companyID = this.route.snapshot.paramMap.get("companyID");
    this.companyService.GetBeheerdersRechtenFromUserID(Number(this.companyID), Number(this.userID)).subscribe(
      data => {
      this.realData = JSON.parse(data);
      for (let beheerder of this.realData) {
        if (beheerder.name == "Beheerder") {
          this.isBeheerder = true;
          break;
        }
        else {
          this.isBeheerder = false;
        }
      }
    },
    err => {
      this.isBeheerder = false;
      this.isFoutGegaan = true;
      this.errorMessage = err.error.message;
    }
  );

    this.userService.getUser(Number(this.userID)).subscribe(
      data => {
      this.realDataUser = JSON.parse(data);
      console.log(this.realDataUser);
    },
    err => {
      this.isFoutGegaan = true;
      this.errorMessage = err.error.message;
    }
  );
  }


  BeheerderToekennen(companyID, userID) {
    this.companyService.AddUserToCompany(companyID, Number(userID), 3, 0).subscribe(
      data => {
        this.reloadPage();
    },
    err => {
      this.isFoutGegaan = true;
      this.errorMessage = err.error.message;
    }
    );
  }

  BeheerderWegnemen(companyID, userID) {
    this.companyService.RolWegnemen(companyID, Number(userID), 3, 0).subscribe(
      data => {
        this.reloadPage();
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
