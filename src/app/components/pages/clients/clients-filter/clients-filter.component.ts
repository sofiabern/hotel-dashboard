import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../clients.service';
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
  loading: boolean = false;


  constructor(private clientsService : ClientsService){

  }

  ngOnInit() {
    this.searchTerm = this.clientsService.getFilter();
    this.clientsService.loading$.subscribe(loading => this.loading = loading);

  }

  applyFilter() {
    this.clientsService.setFilter(this.searchTerm);
    this.clientsService.fetchClients(1, this.clientsService.getPerPage(), this.searchTerm);
  }

  resetFilter() {
    window.location.reload();
  }
}
