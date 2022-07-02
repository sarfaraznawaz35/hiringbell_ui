import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidemenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
