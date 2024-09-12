import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserServiceService } from '../../components/user/services/user.service';


@Injectable()
export class UserEffects {
  actions$ = inject(Actions)
  api = inject(UserServiceService)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(action => {
        console.log('Login action:', action); 
        const { email, password } = action; 

        return this.api.login({email,password}).pipe( 
          map(user => UserActions.loginSuccess({ user,token:user.token })), 
          catchError(error => of(UserActions.loginFailure({ error: error.message })))
        );
      })
    )
  );
}
