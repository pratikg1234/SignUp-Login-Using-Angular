import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css',
})
export class SignupSuccessComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
