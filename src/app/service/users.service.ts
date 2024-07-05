import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { ApiResponse } from '../model/ApiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUserUrl = 'https://localhost:7008/api/user';
  constructor(private http: HttpClient) {}

  getLoggedInUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUserUrl}/loggedinusers`);
  }

  createUser(user: User) {
    return this.http.post<ApiResponse>(`${this.baseUserUrl}`, user);
  }

}
