import { Component, Input } from '@angular/core';

// Types
import { Client } from '../clients.types';



@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientsCardComponent {
@Input() client!: Client;
}
