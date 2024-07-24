import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

// Components
import { CheckInsBookingsFilterComponent } from './check-ins-bookings-filter/check-ins-bookings-filter.component';
import { CheckInsBookingsListComponent } from './check-ins-bookings-list/check-ins-bookings-list.component';

// Types
import { CheckInBooking } from './check-ins-bookings.types';
import { PaginationInfo } from '../../../common.types';


// Services
import { CheckInsBookingsService } from './check-ins-bookings.service';

// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    CheckInsBookingsFilterComponent,
    CheckInsBookingsListComponent,
    MatPaginatorModule
  ],
  templateUrl: './check-ins-bookings.component.html',
  styleUrls: ['./check-ins-bookings.component.css']
})
export class CheckInsBookingsComponent implements OnInit {
  checkInsBookings: CheckInBooking[] = [];
  loading: boolean = false;
  paginationInfo!: PaginationInfo;
  currentPage: number = 1;
  perPage: number = 6;

  constructor(private checkInsBookingsService: CheckInsBookingsService) {}

  ngOnInit() {
    this.checkInsBookingsService.loading$.subscribe(loading => this.loading = loading);
    this.checkInsBookingsService.checkInsBookings$.subscribe(checkInsBookings => {
      this.checkInsBookings = checkInsBookings;
    });
    this.checkInsBookingsService.paginationInfo$.subscribe(paginationInfo => {
      this.paginationInfo = paginationInfo;
      this.perPage = paginationInfo.perPage;
    });
    this.loadCheckIns();
  }

  loadCheckIns(page: number = this.currentPage) {
    const filter = this.checkInsBookingsService.getFilter();
    this.checkInsBookingsService.fetchCheckIns(page, this.perPage, filter);
  }

  nextPage() {
    if (this.paginationInfo.hasNextPage) {
      this.currentPage++;
      this.loadCheckIns(this.currentPage);
    }
  }

  previousPage() {
    if (this.paginationInfo.hasPreviousPage) {
      this.currentPage--;
      this.loadCheckIns(this.currentPage);
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadCheckIns(this.currentPage);
  }
}
