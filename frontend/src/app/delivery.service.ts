import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from './delivery.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private http = inject(HttpClient);
  // Assicurati che l'URL sia corretto e corrisponda alla porta del tuo backend Flask
  private apiUrl = 'https://expert-parakeet-4jq4599pgq46c7rgv-5000.app.github.dev/deliveries';

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  // --- NUOVO METODO PER IL COMMIT 5 ---
  createDelivery(delivery: Partial<Delivery>): Observable<any> {
    return this.http.post(this.apiUrl, delivery);
  }
}