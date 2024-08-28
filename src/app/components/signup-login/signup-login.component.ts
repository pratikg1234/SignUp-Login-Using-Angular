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
    this.form = this.fb.group({//reactive form 
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$') // Allows 10 digits and numbers from 0 to 9
        ]
      ],
      email: ['',[Validators.required,Validators.email]]
    });

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
    // Check if form is valid
    if (this.form.valid) {
      const user = mockUsers.find(
        u =>
          u.email === this.form.get('email')?.value ||
          u.phone === this.form.get('mobileNumber')?.value
      );
  
      if (user) {
        // If User exists, navigate to login
        this.store.dispatch(setUser({ user }));
        this.router.navigate(['/login']);
      } else {
        // User does not exist, navigate to signup step 1
        const newUser: User = {
          email: this.form.value.email || '',
          phone: this.form.value.mobileNumber || '',
        };
        this.store.dispatch(setUser({ user: newUser }));
        this.router.navigate(['/signup-step1']);
      }
    } else {
      // Showing error message if form is invalid
      this.errMsg = true;
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
