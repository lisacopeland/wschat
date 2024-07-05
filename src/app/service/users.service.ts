import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  baseUserUrl = `${this.apiUrl}/api/user`;

  constructor(private http: HttpClient) {}

  getLoggedInUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUserUrl}/loggedinusers`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUserUrl}`);
  }

  createUser(user: User) {
    return this.http.post<ApiResponse>(`${this.baseUserUrl}`, user);
  }

}
