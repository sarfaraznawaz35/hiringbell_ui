import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AjaxService } from 'src/providers/ajax.service';
import { CommonService } from 'src/providers/common.service';
import { iNavigation } from 'src/providers/iNavigation';
import { JwtService } from 'src/providers/jwtService';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CommonService,
    AjaxService,
    iNavigation,
    JwtService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
