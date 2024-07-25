import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../service/users.service';
import {
  loadLoggedInUsersAction,
  setUserErrorAction,
  setUsersAction,
  signupUserAction,
  userSignedupAction,
} from './user.actions';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  concurrentRequests = 5;

  constructor(public service: UserService, public actions$: Actions) {}

  loadLoggedInUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLoggedInUsersAction),
      mergeMap((action) => {
        return this.service.getUsers().pipe(
          map((response) => {
            return setUsersAction({ payload: response });
          }),
          catchError((error) => {
            return of(
              setUserErrorAction({
                payload: { error: error.error },
              })
            );
          })
        );
      }, this.concurrentRequests)
    )
  );
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUserAction),
      mergeMap((action) => {
        return this.service.createUser(action.payload.user).pipe(
          map((response) => {
            const user = { ...action.payload.user };
            user.id = response.id;
            return userSignedupAction({
              payload: { user: user },
            });
          }),
          catchError((error) => {
            return of(
              setUserErrorAction({
                payload: { error: error.error },
              })
            );
          })
        );
      }, this.concurrentRequests)
    )
  );
}
