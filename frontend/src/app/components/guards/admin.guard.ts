// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectCurrentUser } from '../../store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      take(1),
      map(user => {
        if (user && user.isadmin) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
