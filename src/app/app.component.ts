import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WebsocketService } from './service/websocket.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { logOutUserAction } from './+state/auth.actions';
import { User } from './model/user.model';
import { selectUser } from './+state/auth.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private websocketService: WebsocketService,
    private router: Router
  ) {}
  title = 'ws-chat';
  currentUser: User;
  loggedIn = false;
  items: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-plus',
      command: () => {
        this.logout();
      },
    },
  ];

  ngOnInit() {
    this.websocketService.startSocket();
    this.store.select(selectUser).subscribe((user) => {
      if (user !== null) {
        this.currentUser = user;
        this.loggedIn = true;
        this.router.navigateByUrl('chat');
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
    this.store.dispatch(
      logOutUserAction({ payload: { user: this.currentUser } })
    );
    this.router.navigateByUrl('login');
  }
}
