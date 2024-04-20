import { Component, OnInit } from '@angular/core';
import { loadUserMessagesAction } from './+state/messages.actions';
import { Store } from '@ngrx/store';
import { WebsocketService } from './service/websocket.service';
import { selectAllMessages } from './+state/messages.reducer';
import { UserMessage } from './model/message.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private websocketService: WebsocketService, private fb:FormBuilder) {}
  title = 'ws-chat';
  messages: UserMessage[];
  form: FormGroup;

  ngOnInit() {
    this.websocketService.startSocket();
    this.store.dispatch(loadUserMessagesAction({ payload: {}}));
    this.store.select(selectAllMessages).subscribe((messages) => {
      this.messages = messages;
    });
    this.form = this.fb.group({
      message: ['', [Validators.maxLength(150)]]
    });
  }
}
