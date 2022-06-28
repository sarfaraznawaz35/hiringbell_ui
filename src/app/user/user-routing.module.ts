import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboard, UserProfile, UserProfilePage } from 'src/providers/constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  //{path: UserProfilePage, component: ProfileComponent},
  {path: UserDashboard, component: DashboardComponent},
  {path: UserProfilePage, component: UserprofileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
