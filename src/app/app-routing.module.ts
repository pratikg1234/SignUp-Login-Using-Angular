import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
import { LoginComponent } from './components/login/login.component';
import { SignupStep1Component } from './components/signup-step1/signup-step1.component';
import { SignupStep2Component } from './components/signup-step2/signup-step2.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';

//defining the routes array for different components
const routes: Routes = [
  { path: '', component: SignupLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-step1', component: SignupStep1Component },
  { path: 'signup-step2', component: SignupStep2Component },
  { path: 'login-success', component: LoginSuccessComponent },
  { path: 'signup-success', component: SignupSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
