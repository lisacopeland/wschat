import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WebsocketService } from './service/websocket.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { logOutUserAction, userLoggedInAction } from './+state/auth.actions';
import { User } from './model/user.model';
import { selectUser, selectUserLoggedIn } from './+state/auth.reducers';
import { AuthService } from './service/auth.service';
import { environment } from '../environments/environment';
import { loadLoggedInUsersAction } from './+state/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private websocketService: WebsocketService,
    private authService: AuthService,
    private router: Router
  ) {}
  // avatarUrl = `https://wschatavatars.s3.us-west-2.amazonaws.com/Lisacope.jpg`;
  currentUser: User;
  loggedIn = false;
  showDialog = false;
  items: MenuItem[] = [
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      command: () => {
        this.showAbout();
      },
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    }
  ];

  ngOnInit() {
    console.info(
      'environment.production is ',
      environment.production,
      ' apiUrl is ',
      environment.apiUrl
    );
    this.websocketService.startSocket();
    this.store.dispatch(loadLoggedInUsersAction({ payload: {} }));
    // See if there is already a loggedin user
    const user = this.authService.getSignedInUser();
    if (user !== null) {
      this.store.dispatch(userLoggedInAction({ payload: { user: user } }));
    }
    this.store.select(selectUser).subscribe((user) => {
      if (user !== null) {
        this.currentUser = user;
        this.loggedIn = true;
        this.router.navigateByUrl('/chat');
      }
    });
    this.store.select(selectUserLoggedIn).subscribe((isLoggedIn) => {
      if (isLoggedIn === false) {
        this.loggedIn = false;
        this.router.navigateByUrl('/login');
      }
    });
  }

  showAbout() {
    this.showDialog = true;
  }

  logout() {
    if (this.loggedIn === false) {
      return;
    }
    this.loggedIn = false;

    this.store.dispatch(
      logOutUserAction({ payload: { user: this.currentUser } })
    );
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
