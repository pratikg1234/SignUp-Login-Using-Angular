import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setUser } from '../../store/user.actions';
import { mockUsers } from '../../mockusers/mock-data';
import { Observable } from 'rxjs';
import { selectUserName } from '../../store/user.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  errMsg: boolean = false;
  userName$!: Observable<string | undefined>;
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
          Validators.pattern('^[0-9]{10}$'), // Allows 10 digits and numbers from 0 to 9
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
    console.log(this.form);
  }

  ngOnInit(){
    //selecting username from the store
    this.userName$ = this.store.select(selectUserName);

  }
  onSubmit() {
    console.log('object');
    if (this.form.value.email) {
      // Remove the required validator from mobileNumber
      this.form.get('mobileNumber')?.clearValidators();
      this.form.get('mobileNumber')?.setValidators([
        Validators.pattern('^[0-9]{10}$'), // Retaining the pattern validator
      ]);
      this.form.get('mobileNumber')?.updateValueAndValidity();
    } else if (this.form.value.mobileNumber) {
      // Remove the required validator from mobileNumber
      this.form.get('email')?.clearValidators();
      this.form.get('email')?.setValidators([
        Validators.email, // Retaining the email validator
      ]);
      this.form.get('email')?.updateValueAndValidity();
    }

    const user = mockUsers.find(
      (u) =>
        u.email === this.form.get('email')?.value ||
        u.phone === this.form.get('mobileNumber')?.value
    );
    if (this.form.valid) {
      if (user) {
        this.store.dispatch(setUser({ user }));
        this.router.navigate(['/login']);
      } else {
        // this.store.dispatch(setUser({ user: { email: this.emailOrPhone, phone: this.emailOrPhone } }));
        this.router.navigate(['/signup-step1']);
      }
    } else {
      this.errMsg = true;
    }
  }
 
}
