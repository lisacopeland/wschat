import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

// TODO: Implement an error popup

export const loadLoggedInUsersAction = createAction(
  'Users: Load All',
  props<{ payload: {}}>()
);
export const setUsersAction = createAction(
  'Users: Set All',
  props<{ payload: User[] }>()
);

export const userEnteredAction = createAction(
  'Users: User Entered',
  props<{ payload: { user: User }}>()
);

export const userExitedAction = createAction(
  'Users: User Exited',
  props<{ payload: { id: string }}>()
);

export const signupUserAction = createAction(
  'Users: Signup User',
  props<{ payload: { user: User } }>()
);
export const userSignedupAction = createAction(
  'Users: User Signed Up',
  props<{ payload: { user: User } }>()
);
export const setUserErrorAction = createAction(
  'Users: Sign up Error',
  props<{ payload: { error: string } }>()
);


