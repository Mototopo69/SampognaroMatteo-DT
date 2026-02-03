import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../delivery.interface'; // Importa l'interfaccia

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery-form.html',
  styleUrls: ['./delivery-form.css']
})
export class DeliveryFormComponent {
  private deliveryService = inject(DeliveryService);

  @Output() deliveryCreated = new EventEmitter<void>();

  // CORREZIONE QUI: Definiamo esplicitamente il tipo
  newDelivery: Partial<Delivery> = {
    tracking_code: '',
    recipient_name: '',
    address: '',
    time_slot: '',
    priority: 'LOW' // Ora TypeScript sa che è compatibile grazie a Partial<Delivery>
  };

  onSubmit() {
    if (!this.newDelivery.tracking_code || !this.newDelivery.recipient_name) {
      alert('Compila i campi obbligatori!');
      return;
    }

    this.deliveryService.createDelivery(this.newDelivery).subscribe({
      next: () => {
        this.deliveryCreated.emit();
        // Reset del form
        this.newDelivery = {
          tracking_code: '',
          recipient_name: '',
          address: '',
          time_slot: '',
          priority: 'LOW'
        };
      },
      error: (err) => alert('Errore: ' + (err.error?.error || 'Server error'))
    });
  }
}