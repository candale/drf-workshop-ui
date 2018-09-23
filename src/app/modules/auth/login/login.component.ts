import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth/auth.service';

const login = {
  login: "Login",
  email: "Email",
  error: "Please provide a valid email address.",
  password: "Password",
  start: "Get Started"
}

@Component({
  selector: 'talent-app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly login = login;
  loginForm: FormGroup;
  isSubmitting: Boolean = false;
  errors: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() { }

  submitForm() {
    this.resetErrors();
    this.isSubmitting = true;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      this.isSubmitting = false;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1);
    }, error => {
      const formError = error.error;
      this.isSubmitting = false;
    });
  }

  resetErrors() {
    this.errors.length = 0;
  }
}
