import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, User } from '../../../store/user.interface';
import { selectUserDetails } from '../../../store/user/user.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user$: Observable<User | null> = new Observable<User | null>();
  isAdmin: boolean = false;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
      this.user$ = this.store.select(selectUserDetails) 
      this.user$.subscribe((user) => {
        if (user) {
          this.isAdmin = user.isadmin ?? false;
          console.log(this.isAdmin,"haiiii")
        }
      });
  }
}
