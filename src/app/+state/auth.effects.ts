import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import {
  loginAction,
  logOutUserAction,
  setAuthErrorAction,
  userLoggedInAction,
  userLoggedOutAction,
} from './auth.actions';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthEffects {
  concurrentRequests = 5;

  constructor(public service: AuthService, public actions$: Actions) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      mergeMap((action) => {
        return this.service
          .signIn(action.payload.email, action.payload.password)
          .pipe(
            map((user) => {
              return userLoggedInAction({
                payload: { user: user },
              });
            }),
            catchError((error) => {
              return of(
                setAuthErrorAction({
                  payload: { error: error.error },
                })
              );
            })
          );
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOutUserAction),
      mergeMap((action) => {
        return this.service.signOut(action.payload.user.id).pipe(
          map((response) => {
            return userLoggedOutAction({
              payload: {},
            });
          }),
          catchError((error) => {
            return of(
              setAuthErrorAction({
                payload: { error: error.error },
              })
            );
          })
        );
      })
    )
  );
}
