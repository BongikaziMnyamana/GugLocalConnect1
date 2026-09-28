import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Review } from '../models/models';

// Maps to "Review Management" API module: submit & manage reviews, rating analytics
@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly base = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getForBusiness(businessId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.base}/business/${businessId}`);
  }

  submit(payload: { businessId: number; rating: number; comment: string }): Observable<Review> {
    return this.http.post<Review>(this.base, payload);
  }
}
