import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideEffects } from '@ngrx/effects'; 
import { storeConfig } from './app/store/store.config';
import { AuthInterceptor } from './app/components/auth.interceptor';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    storeConfig
]
}).catch(err => console.error(err));