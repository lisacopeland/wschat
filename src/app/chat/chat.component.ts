import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  createUserMessageAction,
  loadUserMessagesAction,
} from '../+state/messages.actions';
import {
  selectAllMessages,
  selectMessagesError,
} from '../+state/messages.reducer';
import { UserMessage } from '../model/message.model';
import { User } from '../model/user.model';
import { selectUser } from '../+state/auth.reducers';
import { loadLoggedInUsersAction } from '../+state/user.actions';
import {
  selectAllLoggedInUsers,
  selectUserError,
} from '../+state/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  messages$: Observable<UserMessage[]> = this.store.select(selectAllMessages);

  user: User;
  loggedInUsers$: Observable<User[]> = this.store.select(
    selectAllLoggedInUsers
  );
  form: FormGroup;
  hasError = false;
  errorMessage = '';
  displayUsers = false;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch(loadUserMessagesAction({ payload: {} }));

    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
    this.store
      .select(selectMessagesError)
      .subscribe((messagesError: string) => {
        this.hasError = true;
        this.errorMessage = messagesError;
      });
    this.store.select(selectUserError).subscribe((userError: string) => {
      this.hasError = true;
      this.errorMessage = userError;
    });

    this.form = this.fb.group({
      message: ['', [Validators.maxLength(150), Validators.minLength(3)]],
    });
  }

  onClear() {
    this.form.controls['message'].reset();
  }

  openUserSidebar() {
    this.displayUsers = true;
  }

  onSubmit() {
    const newMessage: UserMessage = {
      userName: this.user.userName,
      message: this.form.controls['message'].value,
      messageDate: new Date(),
    };
    this.store.dispatch(createUserMessageAction({ payload: newMessage }));
    this.form.controls['message'].reset();
  }
}
