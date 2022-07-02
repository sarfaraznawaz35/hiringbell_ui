import { Component, OnInit } from '@angular/core';
// import * as $ from 'JQuery';
declare var $: any;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  private modalReference;

  ngOnInit(): void {
  }

  employementPopup(content) {
    // $('#addEmployment').show();
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  // closeMe() {
  //   this.modalReference.close();
  // }
}
