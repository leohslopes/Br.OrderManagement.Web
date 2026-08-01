import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CreateOrder } from '../models/create-order';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/orders`;

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.api}/${id}`);
  }

  create(order: CreateOrder): Observable<string> {
    return this.http.post<string>(this.api, order);
  }

  confirm(id: string): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/confirm`, {});
  }

  cancel(id: string): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/cancel`, {});
  }

  finish(id: string): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/finish`, {});
  }
}
