import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User, mapToUsers } from '../model/user.model';
import {
  loadLoggedInUsersAction,
  setUsersAction,
  signupUserAction,
  userEnteredAction,
  userExitedAction,
  userSignedupAction,
} from './user.actions';

export interface UserState {
  loggedInUsers: User[];
  userError: string;
  userSignedup: boolean;
}

const initialState: UserState = {
  loggedInUsers: [],
  userError: null,
  userSignedup: false,
};

export const USER_FEATURE_KEY = 'users';

export const userReducer = createReducer(
  initialState,
  on(loadLoggedInUsersAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),
  on(setUsersAction, (state, action) => {
    const newState = {
      ...state,
      loggedInUsers: mapToUsers(action.payload),
      userError: null,
    };
    return newState;
  }),

  on(userEnteredAction, (state, action) => {
    const newUser = new User(action.payload.user);
    newUser.online = true;
    const users = [ ...state.loggedInUsers ];
    const userIdx = users.findIndex(x => x.id === newUser.id);
    if (userIdx === -1) {
      users.push(newUser);
    } else {
      users.splice(userIdx, 1, newUser);
    }
    const newState = { ...state, loggedInUsers: users, loggedIn: true };
    return newState;
  }),

  on(userSignedupAction, (state, action) => {
    const newState = { ...state, userSignedup: true, userError: null };
    return newState;
  }),
  on(signupUserAction, (state, action) => {
    const newState = { ...state, userSignedup: false, userError: null };
    return newState;
  }),
  on(userExitedAction, (state, action) => {
    const loggedOutUserId = action.payload.id;
    const users = [ ...state.loggedInUsers ];
    const idx = users.findIndex((x) => x.id === loggedOutUserId);
    if (idx !== -1) {
      const user = new User(users[idx]);
      user.online = false;
      users.splice(idx, 1, user);
    }
    const newState = { ...state, loggedInUsers: users };
    return newState;
  })
);

export const getUsersState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectAll = createSelector(
  getUsersState,
  (state: UserState) => state
);

export const selectAllLoggedInUsers = createSelector(selectAll, (state) =>
  mapToUsers(state.loggedInUsers)
);
export const selectUserError = createSelector(
  selectAll,
  (state) => state.userError
);
export const selectUserSignedup = createSelector(
  selectAll,
  (state) => state.userSignedup
);
