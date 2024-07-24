import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Types
import { Client, ClientsPaginationApiResponse } from './clients.types';
import { PaginationInfo } from '../../../common.types';

// Services
import { ClientsApiService } from '../../../api-services/clients.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private perPage: number = 6;
  private currentFilter: string = '';

  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$ = this.clientsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private paginationInfoSubject = new BehaviorSubject<PaginationInfo>({
    page: 1,
    perPage: 6,
    totalItems: 6,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  paginationInfo$ = this.paginationInfoSubject.asObservable();

  constructor(private clientsApiService: ClientsApiService, private toastr: ToastrService) { }


  fetchClients(page: number = 1, perPage: number = this.perPage, filter: string = this.currentFilter) {
    this.perPage = perPage;
    this.currentFilter = filter;
    this.loadingSubject.next(true);

    this.clientsApiService.getClients(page, perPage, filter).subscribe({
      next: (response: ClientsPaginationApiResponse) => {
        this.clientsSubject.next(response.data.clients);
        this.paginationInfoSubject.next({
          page: response.data.page,
          perPage: response.data.perPage,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
          hasPreviousPage: response.data.hasPreviousPage,
          hasNextPage: response.data.hasNextPage
        });
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching clients.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  getFilter(): string {
    return this.currentFilter;
  }

  getPerPage(): number {
    return this.perPage;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
