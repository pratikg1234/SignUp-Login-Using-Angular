import { Component } from '@angular/core';
import { setUser } from '../../store/user.actions';
import { allowedOrganizations } from '../../mockusers/mock-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectUserBirthDate,
  selectUserCity,
  selectUserDesignation,
  selectUserOrgName,
  selectUserPinCode,
} from '../../store/user.selectors';
import { Observable } from 'rxjs';
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
  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      orgName: ['', [Validators.required]],
      designation: [''],
      birthdate: [''],
      city: [''],
      pincode: ['', [Validators.pattern('^[0-9]{6}$')]],
    });
    console.log(this.form);
  }

  ngOnInit() {
    this.designations = allowedOrganizations.map((org) => org.designation);

    //For getting the org name from the store
    this.OrgName$ = this.store.select(selectUserOrgName);
    this.OrgName$.subscribe((orgname) => {
      this.form.patchValue({ orgname });
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
  }

  //For submitting the form
  onSubmit() {
    if (this.form.valid) {
      const formData: any = this.form.value;
      this.store.dispatch(setUser({ user: formData }));
      allowedOrganizations.push(formData);
      this.router.navigate(['/signup-step1']);
    } else {
      this.errMsg = true;
    }
  }
  validateOrganization() {
    const org1 = this.form?.get('orgName')?.value;
    const orgname = allowedOrganizations.map((org) => org.orgname);
    console.log('ora name: ', orgname);
    this.organizationInvalid = !orgname.includes(org1);
    console.log('organizationInvalid', this.organizationInvalid);
  }
}
