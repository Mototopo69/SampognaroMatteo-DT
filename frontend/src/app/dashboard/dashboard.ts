import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../delivery.interface';
// IMPORTA IL FORM
import { DeliveryFormComponent } from '../delivery-form/delivery-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // AGGIUNGI DeliveryFormComponent AGLI IMPORTS
  imports: [CommonModule, DeliveryFormComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private deliveryService = inject(DeliveryService);

  deliveries = signal<Delivery[]>([]);

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.deliveryService.getDeliveries().subscribe({
      next: (data) => {
        this.deliveries.set(data);
      },
      error: (err) => console.error('Errore recupero consegne:', err)
    });
  }
}