import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  loginAction,
  logOutUserAction,
  setAuthErrorAction,
  userLoggedInAction,
  userLoggedOutAction
} from './auth.actions';
import { User } from '../model/user.model';

export interface AuthState {
  user: User;
  authError: string;
  userLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  userLoggedIn: false
};

export const AUTH_FEATURE_KEY = 'auth';

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),

  on(userLoggedInAction, (state, action) => {
    const userString = JSON.stringify(action.payload.user);
    sessionStorage.setItem('user', userString);
    const newState = {
      ...state,
      user: action.payload.user,
      authError: null,
      userLoggedIn: true,
    };
    return newState;
  }),
  on(setAuthErrorAction, (state, action) => {
    const newState = { ...state, authError: action.payload.error };
    return newState;
  }),
  on(userLoggedOutAction, (state, action) => {
    sessionStorage.clear();
    const newState = { ...state, user: null, userLoggedIn: false };
    return newState;
  })
);

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAll = createSelector(
  getAuthState,
  (state: AuthState) => state
);

export const selectUserLoggedIn = createSelector(
  selectAll,
  (state) => state.userLoggedIn
);

export const selectUser = createSelector(
  selectAll,
  (state) => state.user ? state.user : null
);


export const selectAuthError = createSelector(
  selectAll,
  (state) => state.authError
);
