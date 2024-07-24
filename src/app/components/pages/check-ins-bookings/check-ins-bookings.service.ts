import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Types
import { CheckInBooking } from './check-ins-bookings.types';

// Service
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';

// Etc
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class CheckInsBookingsService {

  private perPage: number = 6;
  private currentFilter: string = '';

  private checkInsBookingsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  checkInsBookings$ = this.checkInsBookingsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private paginationInfoSubject = new BehaviorSubject<any>({});
  paginationInfo$ = this.paginationInfoSubject.asObservable();

  constructor(private checkInsBookingsApiService: CheckInsBookingsApiService, private toastr: ToastrService) { }




  fetchCheckIns(page: number = 1, perPage: number = this.perPage, filter: string = this.currentFilter) {
    this.perPage = perPage;
    this.currentFilter = filter;
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.getCheckIns(page, perPage, filter).subscribe({
      next: (response) => {
        this.checkInsBookingsSubject.next(response.data.checkIns);
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
        this.toastr.error('Oops! Something went wrong while fetching check-ins.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

  getCheckIns(): CheckInBooking[] {
    return this.checkInsBookingsSubject.value;
  }
  getPerPage(): number {
    return this.perPage;
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  getFilter(): string {
    return this.currentFilter;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }

  approveCheckIn(checkInId: string) {
    this.loadingSubject.next(true);
    const updateData: Partial<CheckInBooking> = {
      isCheckIn: true
    };
    this.checkInsBookingsApiService.updateCheckIn(checkInId, updateData).subscribe({
      next: () => {
        this.fetchCheckIns();
        this.toastr.success('Check-in approved successfully!');
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while approving check-in.');
      }
    });
  }

  cancelCheckIn(checkInId: string) {
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.deleteCheckIn(checkInId).subscribe({
      next: () => {
        this.fetchCheckIns();
        this.toastr.success('Check-in cancelled successfully!');
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while cancelling check-in.');
      }
    });
  }
}
