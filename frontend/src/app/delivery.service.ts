import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from './delivery.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private http = inject(HttpClient);
private apiUrl = 'https://expert-parakeet-4jq4599pgq46c7rgv-5000.app.github.dev/deliveries';
  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  createDelivery(delivery: Partial<Delivery>): Observable<any> {
    return this.http.post(this.apiUrl, delivery);
  }

  // --- NUOVO METODO COMMIT 6 ---
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }
}