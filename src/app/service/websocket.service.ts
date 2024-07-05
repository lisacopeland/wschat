import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserMessage } from '../model/message.model';
import { userMessageCreatedAction } from '../+state/messages.actions';
import { Store } from '@ngrx/store';
import { userEnteredAction, userExitedAction } from '../+state/user.actions';
import { environment } from '../../environments/environment';

export interface WebSocketAction {
  action: string;
  payload: any;
}
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;
  wsUrl = environment.wsUrl;

  constructor(private store: Store) {}

  startSocket() {
    this.socket = new WebSocket(this.wsUrl);
    this.socket.addEventListener('open', (ev) => {
      console.log('opened');
    });
    this.socket.addEventListener('message', (ev) => {
      console.log('message:', ev.data);
      const action = ev.data['action'];
      switch (action) {
        case 'UserMessages: Created': {
          this.store.dispatch(
            userMessageCreatedAction({
              payload: { userMessage: ev.data['payload'] },
            })
          );
          break;
        }
        case 'Users: User Entered': {
          this.store.dispatch(
            userEnteredAction({ payload: ev.data['payload'] })
          );
          break;
        }
        case 'Users: User Exited': {
          this.store.dispatch(
            userExitedAction({ payload: ev.data['payload'] })
          );
          break;
        }
        default: {
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
