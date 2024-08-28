
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

private apiUrl = 'http://localhost:3003'
constructor(private http:HttpClient) { }

register(userData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, userData, { observe: 'response' })
    .pipe(tap(response => {
      console.log('Full response:', response);
    }));
}

login(userData:any):Observable<any>{
   return this.http.post(`${this.apiUrl}/login`,userData,{observe:'response'})
   .pipe(tap(response => {
    console.log("full responseee",response)
   }))
}
}
