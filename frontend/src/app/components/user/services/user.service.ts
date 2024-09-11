import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../../store/user.interface';


@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:3003';

  constructor(private http: HttpClient) {}

  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { observe: 'response' });
  }

  login(userData: any): Observable<User> {
    console.log('frontenddddd ethunnnuuuuuuu serviceee')
     console.log('Service login called with:', userData);
    return this.http.post<{message: string, user: User}>(`${this.apiUrl}/login`, userData)
      .pipe(
        tap( response => {
          console.log("user details from backend ,=> ",response.user)
        }),
        map(response => response.user)
      );
  }
}
