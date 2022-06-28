import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AjaxService } from 'src/providers/ajax.service';
import { CommonService, ErrorToast, Toast } from 'src/providers/common.service';
import { Dashboard, UserDashboard, UserProfile, UserProfilePage, UserType } from 'src/providers/constants';
import { iNavigation } from 'src/providers/iNavigation';
import { JwtService, ResponseModel } from 'src/providers/jwtService';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = "Business manager";
  initialUrl: string = "";
  catagory: any = {};
  isLoading: boolean = false;
  // isGoogleLogin: boolean = false;
  // isGitHubLogin: boolean = false;
  isUserMode: boolean = true;
  userType: string = 'system';

  @Output() userAuthState = new EventEmitter();

  UserForm:FormGroup = new FormGroup({
    UserId: new FormControl(""),
    Password: new FormControl(""),
    ConfirmPassword: new FormControl(""),
    RegistrationCode: new FormControl(""),
    ShopName: new FormControl(""),
    MobileNo: new FormControl("")
  });

  constructor(
    private http: AjaxService,
    private commonService: CommonService,
    private nav: iNavigation,
    // private authService: SocialAuthService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    this.nav.clearNavigation();
  }

  switchMode() {
    this.isUserMode = !this.isUserMode;
  }

  UserLogin() {
    this.isLoading = true;
    if (this.UserForm.valid) {
      this.isLoading = true;
      let request = {
        password: null,
        email: null,
        Mobile: null,
        MediaName: null,
        AccessToken: null,
        UserTypeId: this.userType == 'employee' ? UserType.Employee : UserType.Admin
      };
      let userId = this.UserForm.controls['UserId'].value;
      let password = this.UserForm.controls['Password'].value;

      if (userId !== "" && password !== "") {
        if(userId.indexOf("@") !== -1) {
          request.email = userId;
        } else {
          request.Mobile = userId;
        }

        request.password = password;
        this.http.login("login/AuthenticateUser", request).then(result => {
          if (result) {
            let Data = result;
            console.log(Data);
            Toast("Please wait loading dashboard ...");
            this.nav.navigate(UserProfilePage, Data);
            
            // if(this.userType == 'employee')
             
            // else
            //   this.nav.navigate(Dashboard, null);
          } else {
            ErrorToast("Incorrect username or password. Please try again.");
          }
          this.isLoading = false;
        }).catch(e => {
          this.isLoading = false;
        });
      }
    } else {
      this.isLoading = false;
    }
  }

  ResetSignUpForm() {
    this.UserForm.controls["UserId"].setValue("");
    this.UserForm.controls["Password"].setValue("");
    this.UserForm.controls["ConfirmPassword"].setValue("");
    this.UserForm.controls["RegistrationCode"].setValue("");
    this.UserForm.controls["ShopName"].setValue("");
    this.UserForm.controls["Mobile"].setValue("");

    $("#signup").hide();
    $("#signin").fadeIn();
  }

  SignupUser() {
    this.isLoading = true;
    if (this.UserForm.valid) {
      let UserSighupData = this.UserForm.getRawValue();
      if (UserSighupData.Password === UserSighupData.ConfirmPassword) {
        this.http.post("Authentication/ShopSigup", UserSighupData).then(
          result => {
            if (this.commonService.IsValidString(result)) {
              this.commonService.ShowToast("Registration done successfully");
              this.ResetSignUpForm();
            }
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            this.commonService.ShowToast(
              "Registration fail. Please contact to admin."
            );
          }
        );
      } else {
        this.isLoading = false;
        this.commonService.ShowToast(
          "Password and Confirmpassword is not matching."
        );
      }
    } else {
      this.isLoading = false;
    }
  }

  AllowMobilenoOnly(e: any) {
    let $e: any = event;
    if (!this.commonService.MobileNumberFormat(e.which, $($e.currentTarget).val().length)) {
      if (e.which !== 9) $e.preventDefault();
    }
  }

  EnableSignup() {
    $("#signin").hide();
    $("#signup").fadeIn();
  }

  isScrollbarBottom(container: any) {
    var height = container.outerHeight();
    var scrollHeight = container[0].scrollHeight;
    var scrollTop = container.scrollTop();
    if (scrollTop >= scrollHeight - height) {
      return true;
    }
    return false;
  }

  refreshToken(): void {
    // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(user => {

    // });
  }

  onGoogleSignIn() {
    //this.isGoogleLogin = true;
    event.preventDefault();
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: any) => {
    //   if(user !== null) {
    //     let userSignInDetail = {
    //       UserId: 0,
    //       FirstName: user.firstName,
    //       LastName: user.lastName,
    //       Mobile: null,
    //       EmailId: user.email,
    //       Address: null,
    //       CompanyName: null,
    //       MediaName: "google",
    //       AccessToken: user.response.access_token
    //     };

    //     this.http.post("login/SignUpViaSocialMedia", userSignInDetail).then((response: ResponseModel) => {
    //       if(response.ResponseBody !== null && response.ResponseBody !== "") {
    //         this.jwtService.setLoginDetail(response.ResponseBody);
    //         this.commonService.ShowToast("Registration done successfully");
    //         this.nav.navigate("/", null);
    //       }
    //       this.isGoogleLogin = false;
    //     }).catch(err => {
    //       this.isGoogleLogin = false;
    //       this.commonService.ShowToast("Got some internal error. Please contact admin.");
    //     });
    //   } else {
    //     this.commonService.ShowToast("Registration fail. Please contact to admin.");
    //   }
    // }).catch(e => {
    //   this.isGoogleLogin = false;
    // });
  }

  backToHomePage() {
    this.nav.navigate("/", null);
  }

  enableSystem() {
    this.userType = "system";
  }

  enableEmployee() {
    this.userType = "employee";
  }
}