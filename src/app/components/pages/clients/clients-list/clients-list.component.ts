import { Component, Input } from '@angular/core';
import { ClientsCardComponent } from '../client-card/client-card.component';
import { Client } from '../clients.types';



@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [ClientsCardComponent],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent {
@Input() clients: Client[] = [];
}
