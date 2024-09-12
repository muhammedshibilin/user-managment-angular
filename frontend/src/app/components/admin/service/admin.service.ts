import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3003/admin'; 

  http = inject(HttpClient);

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/users`);
  }

  createUser(userData: any, selectedFile: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    return this.http.post(`${this.apiUrl}/create-user`, formData);
  }

  updateUser(userId: number, userData: any, selectedFile: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    if (userData.image_url) {
      formData.append('oldImageUrl', userData.image_url);
    }

    return this.http.put(`${this.apiUrl}/dashboard/users/${userId}`, formData);
  }

  deleteUser(id: number): Observable<any> {
    console.log("haiididiid seriviceeiill")
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`);
  }
}
