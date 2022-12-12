import { Component, OnInit } from '@angular/core';
import { Login, Registration } from 'src/providers/constants';
import { iNavigation } from 'src/providers/iNavigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private nav:iNavigation) { }

  ngOnInit(): void {
  }

  loginPage(){
    this.nav.navigate(Login, '');
  }

  registerPage(){
    this.nav.navigate(Registration, '');
  }
}
