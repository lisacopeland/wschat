import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserMessage } from '../model/message.model';
import { UserMessageCreatedAction } from '../+state/messages.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;
  constructor(private http: HttpClient, private store: Store) { }

  startSocket() {
    this.socket = new WebSocket('wss://localhost:7008/ws');
    this.socket.addEventListener("open", (ev => {
      console.log('opened')
    }));
    this.socket.addEventListener("message", (ev => {
      console.log('message:', ev.data);
      this.store.dispatch(UserMessageCreatedAction({ payload: {userMessage: ev.data} }));
    }));
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

  getUserMessages(userId: string): Observable<UserMessage[]> {
      return this.http.get<UserMessage[]>('https://localhost:7008/getMessages');
  }
}
