import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../+state/auth.actions';
import { selectAuthError, selectUserLoggedIn } from '../+state/auth.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hasError = false;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectAuthError).subscribe((authError) => {
      this.hasError = true;
      this.errorMessage = authError;
    });
    this.store.select(selectUserLoggedIn).subscribe((loggedIn) => {
      if (loggedIn === true) {
        this.router.navigateByUrl('/chat');
      }
    });

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.login();
  }

  login() {
    this.store.dispatch(
      loginAction({
        payload: {
          email: this.loginForm.value.username,
          password: this.loginForm.value.password,
        },
      })
    );
  }
}
