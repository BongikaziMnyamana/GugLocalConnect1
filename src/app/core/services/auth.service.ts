import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../models/models';

// Maps to "User Management" API module in the architecture diagram:
// Registration, login, roles, profiles, permissions. JWT-based auth.
const TOKEN_KEY = 'glc_token';
const USER_KEY = 'glc_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = `${environment.apiUrl}/auth`;

  // Simple reactive current-user state components can read from
  currentUser = signal<User | null>(this.readStoredUser());

  constructor(private http: HttpClient) {}

  registerCustomer(payload: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register/customer`, payload).pipe(
      tap((res) => this.persistSession(res))
    );
  }

  registerBusiness(payload: { name: string; email: string; password: string; businessName: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register/business`, payload).pipe(
      tap((res) => this.persistSession(res))
    );
  }

  loginCustomer(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login/customer`, payload).pipe(
      tap((res) => this.persistSession(res))
    );
  }

  loginBusiness(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login/business`, payload).pipe(
      tap((res) => this.persistSession(res))
    );
  }

    getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/read/${id}`);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private persistSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
