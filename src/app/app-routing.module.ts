import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login, Registration } from 'src/providers/constants';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: Login, component: LoginComponent },
  { path: Registration, component: RegistrationComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
