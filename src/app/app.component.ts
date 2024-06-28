import { Component, OnInit } from '@angular/core';
import { createUserMessageAction, loadUserMessagesAction } from './+state/messages.actions';
import { Store } from '@ngrx/store';
import { WebsocketService } from './service/websocket.service';
import { selectAllMessages } from './+state/messages.reducer';
import { UserMessage } from './model/message.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private websocketService: WebsocketService, private fb:FormBuilder) {}
  title = 'ws-chat';
  messages: UserMessage[];
  userName = "Anonymous";
  items: MenuItem[] = [
    {
        label: 'Change User',
        icon: 'pi pi-plus',
        command: () => {
            this.updateUser();
        }
    }
];

  form: FormGroup;

  ngOnInit() {
    this.websocketService.startSocket();
    this.store.dispatch(loadUserMessagesAction({ payload: {}}));
    this.store.select(selectAllMessages).subscribe((messages) => {
      this.messages = messages;
    });
    this.form = this.fb.group({
      message: ['', [Validators.maxLength(150), Validators.minLength(3)]]
    });
  }

  updateUser() {

  }

  onClear() {
    this.form.controls['message'].reset();
  }

  onSubmit() {
    const newMessage: UserMessage = {
      userName: 'Lisa',
      message: this.form.controls['message'].value,
      messageDate: new Date()
    }
    this.store.dispatch(createUserMessageAction({ payload: newMessage}));
  }

}
