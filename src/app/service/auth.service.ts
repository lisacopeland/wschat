import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}
  baseAuthUrl = 'https://localhost:7008/api/auth';

  signIn(email: string, password: string) {
    const authenticationDetails = {
      userName: email,
      password: password,
    };

    const url = `${this.baseAuthUrl}/Login`;
    return this.http.post<User>(url, authenticationDetails);
  }

  signOut(userId: string) {
    const authenticationDetails = {
      id: userId
    };
    const url = `${this.baseAuthUrl}/Logout`;
    return this.http.put<ApiResponse>(url, authenticationDetails);
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
