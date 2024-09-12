
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '../user.interface';



export const initialUserState: UserState = {
    user: null,
    isLoggedIn: false,
    error: null
  };

  export const userReducer = createReducer(
    initialUserState,
    on(UserActions.loginSuccess, (state, { user, token }) => ({
      ...state,
      user,
      isLoggedIn: true,
      error: null
    })),
    on(UserActions.loginFailure, (state, { error }) => ({
      ...state,
      user: null,
      isLoggedIn: false,
      error
    })),
    on(UserActions.logout, () => initialUserState)
  );