import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './components/login/login.component';
import { SignupStep1Component } from './components/signup-step1/signup-step1.component';
import { SignupStep2Component } from './components/signup-step2/signup-step2.component';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupStep1Component,
    SignupStep2Component,
    SignupLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
