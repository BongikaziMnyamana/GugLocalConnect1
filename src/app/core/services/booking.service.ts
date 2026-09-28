import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../models/models';

// Maps to "Booking Management" API module: booking requests, status, management
@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly base = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  create(payload: { businessId: number; serviceId: number; date: string }): Observable<Booking> {
    return this.http.post<Booking>(this.base, payload);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.base}/me`);
  }

  updateStatus(id: number, status: Booking['status']): Observable<Booking> {
    return this.http.patch<Booking>(`${this.base}/${id}/status`, { status });
  }
}
