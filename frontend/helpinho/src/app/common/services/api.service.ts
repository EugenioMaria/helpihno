import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://backend-url.com/api';  // Substitua pelo URL base do seu backend

  constructor(
    protected http: HttpClient
  ) { }

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params }).pipe(
      map(response => response as T)
    );
  }

  post<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      map(response => response as T)
    );
  }

  put<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      map(response => response as T)
    );
  }

  delete<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, options).pipe(
      map(response => response as T)
    );
  }
}
