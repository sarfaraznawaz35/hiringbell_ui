import { Component, OnInit } from '@angular/core';
// import * as $ from 'JQuery';
declare var $: any;

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  employementPopup() {
    $('#addEmployment').modal('show');
  }

}
