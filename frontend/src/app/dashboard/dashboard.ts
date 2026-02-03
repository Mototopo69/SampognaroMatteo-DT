import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../delivery.interface';
import { DeliveryFormComponent } from '../delivery-form/delivery-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
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

  // --- NUOVO METODO COMMIT 6 ---
  updateStatus(id: number | undefined, newStatus: string) {
    if (!id) return;
    
    this.deliveryService.updateStatus(id, newStatus).subscribe({
      next: () => {
        // Ricarica la lista per vedere il nuovo colore
        this.loadDeliveries(); 
      },
      error: (err) => console.error('Errore update:', err)
    });
  }
}