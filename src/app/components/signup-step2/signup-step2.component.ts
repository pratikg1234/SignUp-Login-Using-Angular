import { Component } from '@angular/core';
import { setUser } from '../../store/user.actions';
import { allowedOrganizations } from '../../mockusers/mock-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserBirthDate,
  selectUserCity,
  selectUserDesignation,
  selectUserOrgName,
  selectUserPinCode,
} from '../../store/user.selectors';
import { Observable, take } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrl: './signup-step2.component.css',
})
export class SignupStep2Component {
  form: FormGroup;
  errMsg: boolean = false;
  organizationInvalid: boolean = false;
  designations: string[] = [];
  OrgName$!: Observable<string | undefined>;
  Designation$!: Observable<string | undefined>;
  Birthdate$!: Observable<Date | undefined>;
  City$!: Observable<string | undefined>;
  Pincode$!: Observable<string | undefined>;
  organizationNames: string[] = [];
  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder
  ) {//creating the reactive form
    this.form = this.fb.group({
      orgName: ['', Validators.required],
      designation: ['', Validators.required],
      birthdate: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.pattern('^[0-9]{6}$'), Validators.required]],
    });
  }

  ngOnInit() {
    //unique list of designations
    this.designations = [...new Set(allowedOrganizations.map((org) => org.designation))];

    //unique list of organization names
    this.organizationNames = [...new Set(allowedOrganizations.map((org) => org.orgname))];
    //For getting the org name from the store
    this.OrgName$ = this.store.select(selectUserOrgName);
    this.OrgName$.subscribe((orgName) => {
      this.form.patchValue({ orgName });
    });

    //for getting the designation from the store
    this.Designation$ = this.store.select(selectUserDesignation);
    this.Designation$.subscribe((designation) => {
      this.form.patchValue({ designation });
    });

    //for getting the birthdate from the store
    this.Birthdate$ = this.store.select(selectUserBirthDate);
    this.Birthdate$.subscribe((birthdate) => {
      this.form.patchValue({ birthdate });
    });

    //for getting the city from the store
    this.City$ = this.store.select(selectUserCity);
    this.City$.subscribe((city) => {
      this.form.patchValue({ city });
    });

    //for getting the pincode from the store
    this.Pincode$ = this.store.select(selectUserPinCode);
    this.Pincode$.subscribe((pincode) => {
      this.form.patchValue({ pincode });
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

  //For submitting the form
  onSubmit() {
    if (this.form.valid) {
      this.router.navigate(['/signup-success'])
    } else {
      this.errMsg = true;
    }
  }

  //For navigating to signup-step1
  onBackButtonClick(){
    this.router.navigate(['/signup-step1']);
  }
}
