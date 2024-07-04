import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const loginAction = createAction(
  'Auth: Log In',
  props<{ payload: { email: string; password: string } }>()
);
export const userLoggedInAction = createAction(
  'Auth: User Logged In',
  props<{ payload: { user: User }}>()
);

export const setAuthErrorAction = createAction(
  'Auth: Sign in Error',
  props<{ payload: { error: string } }>()
);
export const logOutUserAction = createAction(
  'Auth: Log Out',
  props<{ payload: { user: User}}>()
);
export const userLoggedOutAction = createAction(
  'Auth: User Logged Out',
  props<{ payload: unknown }>()
);
