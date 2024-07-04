import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { loadUserMessagesAction, setUserMessagesAction, createUserMessageAction, userMessageCreatedAction } from './messages.actions';
import { UserMessagesService } from '../service/messages.service';

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
          map((response) => {
            return userMessageCreatedAction({
              payload: { userMessage: action.payload },
            });
          })
        );
      }, this.concurrentRequests)
    )
  );
}
