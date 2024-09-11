import { isDevMode } from '@angular/core';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userReducer } from './user/user.reducer';
import { UserEffects } from './user/user.effects';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['user'],
    rehydrate: true
  })(reducer);
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Auth] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer, clearState];

export const storeConfig = [
  provideStore(
    { 
      user: userReducer,
      router: routerReducer
    },
    { metaReducers }
  ),
  provideEffects([UserEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideRouterStore()
];