import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMessage } from '../model/message.model';


export const baseUserMessageUrl = 'https://localhost:7008/api/messages';

@Injectable({
  providedIn: 'root',
})
export class UserMessagesService {
  constructor(private http: HttpClient) {}

  getUserMessage(id: number): Observable<UserMessage> {
    return this.http.get<UserMessage>(`${baseUserMessageUrl}/${id}`);
  }

  getUserMessages(): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(`${baseUserMessageUrl}`);
  }

  createUserMessage(UserMessage: UserMessage) {
    return this.http.post<void>(`${baseUserMessageUrl}`, UserMessage);
  }

  updateUserMessage(UserMessage: UserMessage) {
    return this.http.put<void>(
      `${baseUserMessageUrl}/${UserMessage._id}`,
      UserMessage
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${baseUserMessageUrl}/${id}`);
  }
}
