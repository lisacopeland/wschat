import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../service/users.service';
import { loadLoggedInUsersAction, setUsersAction, signupUserAction, userSignedupAction } from './user.actions';

@Injectable()
export class UserEffects {
  concurrentRequests = 5;

  constructor(public service: UserService, public actions$: Actions) {}

  loadLoggedInUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLoggedInUsersAction),
      mergeMap((action) => {
        return this.service.getLoggedInUsers().pipe(
          map((response) => {
            return setUsersAction({ payload: response });
          })
        );
      }, this.concurrentRequests)
    )
  );
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUserAction),
      mergeMap((action) => {
        return this.service
          .createUser(action.payload.user)
          .pipe(
            map((response) => {
                const user = {...action.payload.user };
                user._id = response.id;
                return userSignedupAction({
                  payload: { user: user },
                });
            })
          );
      }, this.concurrentRequests)
    )
  );


}
