import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFilterComponent } from './clients-filter/clients-filter.component';
import { ClientsService } from './clients.service';
import { Client } from './clients.types';
import { PaginationInfo } from '../../../common.types';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from '../../loader/loader.component';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ClientsListComponent,
    ClientsFilterComponent,
    LoaderComponent
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  loading: boolean = false;
  paginationInfo!: PaginationInfo ;
  currentPage: number = 1;
  perPage: number = 6;

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.clientsService.loading$.subscribe(loading => this.loading = loading);
    this.clientsService.clients$.subscribe(clients => {
      this.clients = clients;
    });
    this.clientsService.paginationInfo$.subscribe(paginationInfo => {
      this.paginationInfo = paginationInfo;
      this.perPage = paginationInfo.perPage;
    });
    this.loadClients();

  }

  loadClients(page: number = this.currentPage) {
    const filter = this.clientsService.getFilter();
    this.clientsService.fetchClients(page, this.perPage, filter);
  }

  nextPage() {
    if (this.paginationInfo.hasNextPage) {
      this.currentPage++;
      this.loadClients(this.currentPage);
    }
  }

  previousPage() {
    if (this.paginationInfo.hasPreviousPage) {
      this.currentPage--;
      this.loadClients(this.currentPage);
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadClients(this.currentPage);
  }

  applyFilter(filterValue: string) {
    this.clientsService.setFilter(filterValue);
    this.loadClients(1);
  }

  resetFilter() {
    this.clientsService.setFilter('');
    this.loadClients(1);
  }
}
