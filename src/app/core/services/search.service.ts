import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Business } from '../models/models';

// Maps to "Search & Discovery" API module: search businesses, filters, location-based search
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly base = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  search(params: { q?: string; category?: string; area?: string }): Observable<Business[]> {
    let query = new URLSearchParams();
    if (params.q) query.set('q', params.q);
    if (params.category) query.set('category', params.category);
    if (params.area) query.set('area', params.area);
    return this.http.get<Business[]>(`${this.base}?${query.toString()}`);
  }
}
