import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AjaxService } from 'src/providers/ajax.service';
import { CommonService } from 'src/providers/common.service';
import { iNavigation } from 'src/providers/iNavigation';
import { JwtService } from 'src/providers/jwtService';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
