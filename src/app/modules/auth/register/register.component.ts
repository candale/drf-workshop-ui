import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, util } from '@core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting: Boolean = false;
  errors: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  ngOnInit() { }

  submitForm() {
    this.resetErrors();
    this.isSubmitting = true;
    const payload = this.registerForm.getRawValue();
    this.auth.register(payload).subscribe(data => {
      this.snackBar.open("Registration successful! Please login now.", null, { duration: 5000 });
      this.isSubmitting = false;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1);
    }, error => {
      this.errors = util.parseErrors(error);
      this.isSubmitting = false;
    });
  }

  resetErrors() {
    this.errors.length = 0;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
