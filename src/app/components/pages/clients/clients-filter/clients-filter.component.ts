import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { ClientsService } from '../clients.service';

// Etc
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-clients-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './clients-filter.component.html',
  styleUrls: ['./clients-filter.component.css']
})
export class ClientsFilterComponent implements OnInit{
  searchTerm: string = '';

  constructor(private clientsService : ClientsService){

  }

  ngOnInit() {
    this.searchTerm = this.clientsService.getFilter();
  }

  applyFilter() {
    this.clientsService.setFilter(this.searchTerm);
    this.clientsService.fetchClients(1, this.clientsService.getPerPage(), this.searchTerm);
  }

  resetFilter() {
    window.location.reload();
  }
}
