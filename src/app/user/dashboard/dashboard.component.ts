import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AjaxService } from 'src/providers/ajax.service';
import { Toast } from 'src/providers/common.service';
import { iNavigation } from 'src/providers/iNavigation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active = 1;
  userid:number=0;
  dashBoardData:UserDetailForDashboard= new UserDetailForDashboard;
  dashboardForm: FormGroup;
  userDetail: any = null;

  constructor(private http:AjaxService,
              private fb:FormBuilder,
              private nav: iNavigation
            ) { }

  ngOnInit(): void {
    this.userDetail = this.nav.getValue();
    this.userid = 8;
    this.loadDataInDashboard();
    this.initForm();
  }

  loadDataInDashboard(){
    this.http.get(`user/${this.userid}`).then(Response =>{
      if(Response.responseBody){
        this.dashBoardData = Response.responseBody;
        this.initForm();
        Toast("Data get Loaded");
      }
      console.log(JSON.stringify(Response.responseBody));
    })
  }
  initForm(){
    this.dashboardForm=this.fb.group({
      firstName: new FormControl(this.dashBoardData.firstName),
      lastName: new FormControl(this.dashBoardData.lastName),
      mobileNumber: new FormControl(this.dashBoardData.mobile),
      email: new FormControl(this.dashBoardData.email)
    })
  }

}

class UserDetailForDashboard{

  userId: number=0;
  password: String='';
  firstName: String='';
  lastName: String='';
  address: String='';
  email: String='';
  mobile: String='';
  companyName: String='';

}
