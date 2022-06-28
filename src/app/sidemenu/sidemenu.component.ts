import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/providers/common.service';
import { Login } from 'src/providers/constants';
import { iNavigation } from 'src/providers/iNavigation';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor(private nav: iNavigation) { }

  ngOnInit(): void {
    }
    LogoutUser() {
      this.nav.logout();
      Toast("Log out successfully");
      this.nav.navigate("/", null);
    }
    GoToLoginPage() {
      this.nav.navigate(Login, null);
    }

}
