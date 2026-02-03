import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../delivery.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  private deliveryService = inject(DeliveryService);

  // Utilizzo dei SIGNAL per gestire la lista
  deliveries = signal<Delivery[]>([]);

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.deliveryService.getDeliveries().subscribe({
      next: (data) => {
        // Aggiorno il valore del signal
        this.deliveries.set(data);
      },
      error: (err) => console.error('Errore recupero consegne:', err)
    });
  }
}