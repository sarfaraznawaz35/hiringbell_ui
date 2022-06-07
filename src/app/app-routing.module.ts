import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from 'src/providers/constants';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: Login, component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
