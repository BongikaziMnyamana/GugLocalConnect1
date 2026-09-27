import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../models/models';

// Maps to "Messaging Service" API module: real-time messaging between customers & businesses
@Injectable({ providedIn: 'root' })
export class MessagingService {
  private readonly base = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {}

  getConversation(otherUserId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.base}/with/${otherUserId}`);
  }

  getConversations(): Observable<Message[]> {
    return this.http.get<Message[]>(this.base);
  }

  send(payload: { receiverId: number; content: string }): Observable<Message> {
    return this.http.post<Message>(this.base, payload);
  }
}
