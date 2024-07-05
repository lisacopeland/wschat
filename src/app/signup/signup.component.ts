import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../+state/auth.actions';
import { selectAuthError, selectUserLoggedIn } from '../+state/auth.reducers';
import { User } from '../model/user.model';
import { signupUserAction } from '../+state/user.actions';
import { selectUserError, selectUserSignedup } from '../+state/user.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form!: FormGroup;
  hasError = false;
  errorMessage = '';
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router, private store: Store) {}

  ngOnInit(): void {

    this.store.select(selectUserError).subscribe((userError) => {
      this.hasError = true;
      this.errorMessage = userError;
    });
    this.store.select(selectUserSignedup).subscribe((signedup) => {
      if (this.submitted && signedup) {
        this.router.navigate(['/login']);
      }
    });
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      displayName: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form);
    this.signup();
  }

  signup() {
    const newUser: User = {
      email: this.form.value.email,
      userName: this.form.value.userName,
      displayName: this.form.value.displayName,
      createdDate: new Date(),
      onLine: false
    }
    this.store.dispatch(
      signupUserAction({
        payload: {
          user: newUser
        },
      })
    );
    this.submitted = true;

  }
}
