import { Component } from '@angular/core';
import { Dashboard} from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Dashboard], // Aggiungi questo
  template: `<app-dashboard></app-dashboard>`, // Usa il componente
  styleUrls: ['./app.css']
})
export class App {
  title = 'frontend';
}