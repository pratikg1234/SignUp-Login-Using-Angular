import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setUser } from '../../store/user.actions';
import { mockUsers } from '../../mockusers/mock-data';
import { Observable } from 'rxjs';
import {
  selectUserEmail,
  selectUserName,
  selectUserPassword,
} from '../../store/user.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  errMsg: boolean = false;
  errforpass: boolean = false;
  errforemail: boolean = false;
  userName$!: Observable<string | undefined>;
  Password$!: Observable<string | undefined>;
  Email$!: Observable<string | undefined>;
  hide: boolean = true;
  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern(
            '^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]{6,10}$'
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    //selecting username from the store
    this.userName$ = this.store.select(selectUserName);
    this.Email$ = this.store.select(selectUserEmail);
    this.Email$.subscribe((email) => {
      this.form.patchValue({ email });
    });

    //for getting the password from the store
    this.Password$ = this.store.select(selectUserPassword);
    this.Password$.subscribe((password) => {
      this.form.patchValue({ password });
    });
  }

  //for form submission
  onSubmit() {
    this.Password$ = this.store.select(selectUserPassword);
    
    this.Password$.subscribe((storedPassword) => {
      const enteredPassword = this.form.get('password')?.value;
      if (storedPassword !== enteredPassword) {
        this.errforpass = true;
      } else {
        this.errforpass = false;
      }
    });
    this.Email$.subscribe((storedEmail) => {
      const enteredEmail = this.form.get('email')?.value;
      if (storedEmail !== enteredEmail) {
        this.errforemail = true;
      } else {
        this.errforemail = false;
      }
    });
    if (this.form.invalid || this.errforemail || this.errforpass) {
      this.errMsg = true;
      return;
    }
    if(!this.errforemail && !this.errforpass){
      this.router.navigate(['/login-success']);
    }
    
  }
}
