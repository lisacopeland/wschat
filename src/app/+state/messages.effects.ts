import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadUserMessagesAction,
  setUserMessagesAction,
  createUserMessageAction,
  userMessageCreatedAction,
  setMessagesErrorAction,
} from './messages.actions';
import { UserMessagesService } from '../service/messages.service';
import { of } from 'rxjs';

@Injectable()
export class UserMessagesEffects {
  concurrentRequests = 5;

  constructor(public service: UserMessagesService, public actions$: Actions) {}

  loadUserMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserMessagesAction),
      mergeMap((action) => {
        return this.service.getUserMessages().pipe(
          map((response) => {
            return setUserMessagesAction({ payload: response });
          }),
          catchError((error) => {
            return of(
              setMessagesErrorAction({
                payload: { error: error.error },
              })
            );
          })
        );
      }, this.concurrentRequests)
    )
  );

  createUserMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserMessageAction),
      mergeMap((action) => {
        return this.service.createUserMessage(action.payload).pipe(
          map(() => {
          }),
          catchError((error) => {
            return of(
              setMessagesErrorAction({
                payload: { error: error.error },
              })
            );
          })
        );
      }, this.concurrentRequests)
    ), { dispatch: false }
  )
}
