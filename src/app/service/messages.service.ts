import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMessage } from '../model/message.model';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root',
})
export class UserMessagesService {
  apiUrl = environment.apiUrl;
  baseUserMessageUrl = `${this.apiUrl}/api/messages`;
  constructor(private http: HttpClient) {}

  getUserMessage(id: number): Observable<UserMessage> {
    return this.http.get<UserMessage>(`${this.baseUserMessageUrl}/${id}`);
  }

  getUserMessages(): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(`${this.baseUserMessageUrl}`);
  }

  createUserMessage(UserMessage: UserMessage) {
    return this.http.post<ApiResponse>(`${this.baseUserMessageUrl}`, UserMessage);
  }

  updateUserMessage(UserMessage: UserMessage) {
    return this.http.put<ApiResponse>(
      `${this.baseUserMessageUrl}/${UserMessage._id}`,
      UserMessage
    );
  }

  delete(id: number) {
    return this.http.delete<ApiResponse>(`${this.baseUserMessageUrl}/${id}`);
  }
}
