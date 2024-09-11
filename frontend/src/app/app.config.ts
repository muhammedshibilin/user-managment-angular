import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';

import { provideStoreDevtools} from '@ngrx/store-devtools';
import { userReducer } from '../app/store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(userReducer),
    provideState('user',userReducer),
    provideStoreDevtools({ maxAge: 25 }),
    provideEffects([UserEffects])
  ],
};
