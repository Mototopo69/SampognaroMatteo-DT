import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent], // Aggiungi questo
  template: `<app-dashboard></app-dashboard>`, // Usa il componente
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'frontend';
}