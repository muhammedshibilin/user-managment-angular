import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User,AppState } from '../../../store/user.interface';
import { selectUserDetails } from '../../../store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { logout } from '../../../store/user/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  imageUrl:string =''
  user$: Observable<User | null> = new Observable<User | null>();
  constructor(private store: Store<AppState>) {}
  router = inject(Router)
  ngOnInit(): void {
      this.user$ = this.store.select(selectUserDetails)
      this.store.select(selectUserDetails).subscribe( state => {
        console.log('user state form store ',state)
        if (state && state.image_url) {
          this.imageUrl = state.image_url;
        }
      })
  }

  logout(){
    this.store.dispatch(logout());
    localStorage.removeItem('authToken')
    this.router.navigate(['/login']);
  }
  }


