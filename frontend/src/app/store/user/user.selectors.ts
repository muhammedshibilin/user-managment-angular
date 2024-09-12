import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../user.interface';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectUserDetails = createSelector(
  selectUserState,
  (state:UserState) => state.user
)

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (userState) => userState.isLoggedIn
);

export const selectAuthToken = createSelector(
  selectUserState,
  (userState) => userState.user?.token || null
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (userState) => userState.user || null
);