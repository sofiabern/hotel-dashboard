import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckInBooking } from './check-ins-bookings.types';
import { PaginationInfo } from '../../../common.types';
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';
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

  private paginationInfoSubject = new BehaviorSubject<PaginationInfo>({
    page: 1,
    perPage: 6,
    totalItems: 6,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  }); paginationInfo$ = this.paginationInfoSubject.asObservable();

  constructor(private checkInsBookingsApiService: CheckInsBookingsApiService, private toastr: ToastrService) { }




  fetchCheckIns(page: number = 1, perPage: number = this.perPage, filter: string = this.currentFilter) {
    this.perPage = perPage;
    this.currentFilter = filter;
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.getCheckInsBookings(page, perPage, filter).subscribe({
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

  getCheckInsBookings(): CheckInBooking[] {
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
    this.checkInsBookingsApiService.updateCheckInBooking(checkInId, updateData).subscribe({
      next: () => {
        this.fetchCheckIns();
        this.toastr.success('Approval was successful!');
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while approving.');
      }
    });
  }

  cancelCheckIn(checkInId: string) {
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.deleteCheckInBooking(checkInId).subscribe({
      next: () => {
        this.fetchCheckIns();
        this.toastr.success('Cancellation was successful!');
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while cancelling.');
      }
    });
  }
}
