import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AjaxService } from 'src/providers/ajax.service';
import { Toast } from 'src/providers/common.service';
import { iNavigation } from 'src/providers/iNavigation';
import { ResponseModel } from 'src/providers/jwtService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData:UserDetail=new UserDetail();
  profileForm: FormGroup;
  userid:number=0;

  constructor(private fb:FormBuilder,
              private nav:iNavigation,
              private http:AjaxService) { }

  ngOnInit(): void {
    let Data = this.nav.getValue();
    if(Data){
      this.profileData=Data;
      this.userid=this.profileData.userId;
      }
      this.loadData();
      this.initForm();
      
  }


  loadData(){
    this.http.get(`user/${this.userid}`).then(response => {
      if(response.responseBody) {
        this.profileData=response.responseBody;
        this.initForm();
        Toast("Data get Loaded")
      }
        console.log(JSON.stringify(response.responseBody));
    })
  }

  initForm() {
    this.profileForm=this.fb.group({
      firstName: new FormControl(this.profileData.firstName),
      lastName: new FormControl(this.profileData.lastName),
      mobileNumber: new FormControl(this.profileData.mobile),
      email: new FormControl(this.profileData.email),
      companyName: new FormControl(this.profileData.companyName),
      address: new FormControl(this.profileData.address)
    })
  }
  updateProfile()
  {
    console.log(this.profileForm.value);
    let value=this.profileForm.value;
    this.http.post("", value).then(response => {
      if(response.responseBody){}
    });
  }

}

class UserDetail {
  address: String='';
  companyName: String='';
  email: String='';
  firstName: String='';
  lastName: String='';
  mobile: String='';
  password: String='';
  userId: number=0;

}