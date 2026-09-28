import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Business, Category, ServiceItem } from '../models/models';
// Maps to "Business Management" API module: create & manage business profile/services
@Injectable({ providedIn: 'root' })
export class BusinessService {
  private readonly base = `${environment.apiUrl}/businesses`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

   getById(id: number): Observable<Business> {
    return this.http.get<Business>(`${this.base}/read/${id}`);
  }

  getMyProfile(): Observable<Business> {
    return this.http.get<Business>(`${this.base}/me`);
  }

  updateMyProfile(payload: Partial<Business>): Observable<Business> {
    return this.http.put<Business>(`${this.base}/me`, payload);
  }

  getMyServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.base}/me/services`);
  }

  addService(payload: Partial<ServiceItem>): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(`${this.base}/me/services`, payload);
  }

  deleteService(serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/services/${serviceId}`);
  }

    getServicesForBusiness(businessId: number): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.base}/${businessId}/services`);
  }
}
