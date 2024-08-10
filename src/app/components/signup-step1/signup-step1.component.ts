import { Component } from '@angular/core';
import { setUser } from '../../store/user.actions';
import { mockUsers } from '../../mockusers/mock-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserEmail, selectUserName, selectUserPassword } from '../../store/user.selectors';
import { Observable, take } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrl: './signup-step1.component.css',
})
export class SignupStep1Component {
  form: FormGroup;
  errMsg: boolean = false;
  hide: boolean = true;
  Email$!: Observable<string | undefined>;
  Fullname$!: Observable<string | undefined>;
  Password$!: Observable<string | undefined>;
  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,10}$'
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    //For getting the email from the store
    this.Email$ = this.store.select(selectUserEmail);
    this.Email$.subscribe(email => {
      this.form.patchValue({ email });
    });

    //for getting the fullname from the store
    this.Fullname$ = this.store.select(selectUserName);
    this.Fullname$.subscribe(name => {
      this.form.patchValue({ name });
    });

    //for getting the password from the store
    this.Password$ = this.store.select(selectUserPassword);
    this.Password$.subscribe(password => {
      this.form.patchValue({ password });
    });

    // Subscribe to form value changes and update the store
    this.form.valueChanges.subscribe((formData) => {
      this.store
        .select(selectUser)
        .pipe(take(1))
        .subscribe((currentUser) => {
          // Merge the current user object with the new form data
          const updatedUser = { ...currentUser, ...formData };

          // Dispatch the updated user object to the store
          this.store.dispatch(setUser({ user: updatedUser }));
        });
    });
  }
  //for submitting the form 
  onSubmit() {
    if (this.form.valid) {
      mockUsers.push(this.form.value)
      this.router.navigate(['/signup-step2']);
    } else {
      this.errMsg = true;
    }
  }
}
