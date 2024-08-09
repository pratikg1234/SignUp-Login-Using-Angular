import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep1Component } from './signup-step1.component';

describe('SignupStep1Component', () => {
  let component: SignupStep1Component;
  let fixture: ComponentFixture<SignupStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
