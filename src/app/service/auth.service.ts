import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/ApiResponse.model';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  baseAuthUrl = `${this.apiUrl}/api/auth`;

  signIn(email: string, password: string) {
    const authenticationDetails = {
      userName: email,
      password: password,
    };

    const url = `${this.baseAuthUrl}/Login`;
    return this.http.post<User>(url, authenticationDetails);
  }

  signOut(userId: string) {
    const body = {
      id: userId
    };
    const url = `${this.baseAuthUrl}/Logout`;
    return this.http.put<ApiResponse>(url, body);
  }

  getSignedInUser() {
    const userString = sessionStorage.getItem('user');
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

}
