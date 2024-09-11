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
  (state: UserState) => state.isLoggedIn
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);