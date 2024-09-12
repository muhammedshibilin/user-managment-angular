import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from '../app/store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { AuthInterceptor } from './components/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideStore({ user: userReducer }),
    provideState('user', userReducer),
    provideStoreDevtools({ maxAge: 25 }),
    provideEffects([UserEffects])
  ],
};
