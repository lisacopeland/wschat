import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User, mapToUsers } from '../model/user.model';
import { loadLoggedInUsersAction, setUsersAction, userEnteredAction, userExitedAction } from './user.actions';
import { userLoggedInAction, userLoggedOutAction } from './auth.actions';

export interface UserState {
  loggedInUsers: User[];
}

const initialState: UserState = {
  loggedInUsers: [],
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
    };
    return newState;
  }),

  on(userEnteredAction, (state, action) => {
    const newUser = action.payload.user;
    const users = {...state.loggedInUsers};
    users.push(newUser);
    const newState = { ...state, loggedInUsers: users, loggedIn: true };
    return newState;
  }),

  on(userExitedAction, (state, action) => {
    const loggedOutUserId = action.payload.id;
    const users = {...state.loggedInUsers };
    const idx = users.findIndex(x => x._id === loggedOutUserId);
    if (idx !== -1) {
      users.splice(idx, 1);
    }
    const newState = { ...state, loggedInUsers: users };
    return newState;
  })
);

export const getUsersState =
  createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectAll = createSelector(
  getUsersState,
  (state: UserState) => state
);

export const selectAllLoggedInUsers = createSelector(selectAll, (state) =>
  mapToUsers(state.loggedInUsers)
);
