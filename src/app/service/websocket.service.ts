import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mapFromWsMessage, UserMessage } from '../model/message.model';
import { userMessageCreatedAction } from '../+state/messages.actions';
import { Store } from '@ngrx/store';
import { userEnteredAction, userExitedAction } from '../+state/user.actions';
import { environment } from '../../environments/environment';
import { mapFromWsUser, User } from '../model/user.model';

export interface WebSocketAction {
  action: string;
  payload: any;
}
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket = null;
  wsUrl = environment.wsUrl;

  constructor(private store: Store) {}

  startSocket() {
    if (this.socket === null) {
      this.socket = new WebSocket(this.wsUrl);
      this.socket.addEventListener('open', (ev) => {
        console.log('ws opened');
      });
      this.addListeners();
    }
  }

  addListeners() {
    this.socket.addEventListener('message', (ev) => {
      console.log('got a message: ', ev);
      const data = JSON.parse(ev.data);
      const action = data['Action'];
      const payload = data['Payload'];
      console.log('action: ', action);
      console.log('payload ', payload);
      switch (action) {
        case 'UserMessages: Created': {
          const userMessage = mapFromWsMessage(payload.MessageClass);
          this.store.dispatch(
            userMessageCreatedAction({
              payload: { userMessage: userMessage },
            })
          );
          break;
        }
        case 'Users: User Entered': {
          const user: User = mapFromWsUser(payload.UserClass);
          this.store.dispatch(userEnteredAction({ payload: { user: user } }));
          break;
        }
        case 'Users: User Exited': {
          this.store.dispatch(
            userExitedAction({ payload: { id: payload.id } })
          );
          break;
        }
        default: {
          console.log('unknown action received', action);
          // Got a websocket message I am not interested in
          break;
        }
      }
    });
  }

  sendChatMessage(message: UserMessage): Observable<boolean> {
    const requestAsJson = JSON.stringify(message);
    if (this.socket) {
      this.socket.send(requestAsJson);
      return of(true);
    } else {
      return of(false);
    }
  }
}
