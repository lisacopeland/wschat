import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';


import { WebsocketService } from '../service/websocket.service';
import { loadUserMessagesAction, setUserMessagesAction, createUserMessageAction, UserMessageCreatedAction } from './messages.actions';

@Injectable()
export class UserMessagesEffects {
  concurrentRequests = 5;

  constructor(public service: WebsocketService, public actions$: Actions) {}

  loadUserMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserMessagesAction),
      mergeMap((action) => {
        return this.service.getUserMessages('1').pipe(
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
        return this.service.sendChatMessage(action.payload).pipe(
          map((response) => {
            return UserMessageCreatedAction({
              payload: { userMessage: action.payload },
            });
          })
        );
      }, this.concurrentRequests)
    )
  );
}
