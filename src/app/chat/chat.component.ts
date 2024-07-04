import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUserMessageAction, loadUserMessagesAction } from '../+state/messages.actions';
import { selectAllMessages } from '../+state/messages.reducer';
import { UserMessage } from '../model/message.model';
import { User } from '../model/user.model';
import { selectUser } from '../+state/auth.reducers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  messages: UserMessage[];
  user: User;
  form: FormGroup;

  constructor(private store: Store, private fb:FormBuilder) {}

  ngOnInit() {
    this.store.dispatch(loadUserMessagesAction({ payload: {}}));
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
    this.store.select(selectAllMessages).subscribe((messages) => {
      this.messages = messages;
    });
    this.form = this.fb.group({
      message: ['', [Validators.maxLength(150), Validators.minLength(3)]]
    });
  }

  onClear() {
    this.form.controls['message'].reset();
  }

  onSubmit() {
    const newMessage: UserMessage = {
      userName: this.user.userName,
      message: this.form.controls['message'].value,
      messageDate: new Date()
    }
    this.store.dispatch(createUserMessageAction({ payload: newMessage}));
  }

}
