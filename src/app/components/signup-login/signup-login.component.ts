import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.actions';
import { User } from '../../models/user.model';
import { mockUsers } from '../../mockusers/mock-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css']
})
export class SignupLoginComponent {
  form: FormGroup;
  errMsg:boolean=false;
  constructor(private router: Router, private store: Store, private fb:FormBuilder) {
    this.form = this.fb.group({
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$') // Allows 10 digits and numbers from 0 to 9
        ]
      ],
      email: ['',[Validators.required,Validators.email]]
    });
    console.log(this.form)

    // Watch for changes in the mobileNumber field
    this.form.get('mobileNumber')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('email')?.disable();
      } else {
        this.form.get('email')?.enable();
      }
    });

    // Watch for changes in the email field
    this.form.get('email')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('mobileNumber')?.disable();
      } else {
        this.form.get('mobileNumber')?.enable();
      }
    });

  }

  //After we submit the form 
  onSubmit() {
    if (this.form.value.email) {
      // Remove the required validator from mobileNumber
      this.form.get('mobileNumber')?.clearValidators();
      this.form.get('mobileNumber')?.setValidators([
        Validators.pattern('^[0-9]{10}$') // Retaining the pattern validator
      ]);
      this.form.get('mobileNumber')?.updateValueAndValidity();
    } else if(this.form.value.mobileNumber){
      // Remove the required validator from mobileNumber
      this.form.get('email')?.clearValidators();
      this.form.get('email')?.setValidators([
        Validators.email // Retaining the email validator
      ]);
      this.form.get('email')?.updateValueAndValidity();
    }

    //checking if entered user already exits in the mocks & if it is, it will navigate to login
    const user = mockUsers.find(u => u.email == this.form.get('email')?.value || u.phone == this.form.get('mobileNumber')?.value);
    console.log("user is: ",user)
    if(this.form.valid){//if form is valid
      if (user) {
        this.store.dispatch(setUser({ user }));
        this.router.navigate(['/login']);
      } else {
        this.store.dispatch(setUser({ user: { email: this.form.value.email, phone: this.form.value.mobileNumber } }));
        this.router.navigate(['/signup-step1']);
      }
    }
    else{
      this.errMsg = true
    }
    
  }
  //Prevents the users from entering the non-digits 
  validateInput(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/[0-9]/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
