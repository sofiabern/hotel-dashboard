import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Types
import { Room } from './rooms.types';

// Service
import { RoomsApiService } from '../../../api-services/rooms.service';

// Etc
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsSubject = new BehaviorSubject<Room[]>([]);
  rooms$ = this.roomsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private startDateSubject = new BehaviorSubject<Date | null>(null);
  private endDateSubject = new BehaviorSubject<Date | null>(null);
  startDate$ = this.startDateSubject.asObservable();
  endDate$ = this.endDateSubject.asObservable();

  constructor(private roomsApiService: RoomsApiService, private toastr: ToastrService) { }

  fetchRooms() {
    this.roomsSubject.next([]);
    this.loadingSubject.next(true);
    this.roomsApiService.getRooms().subscribe({
      next: (response) => {
        this.roomsSubject.next(response.data);
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching rooms.');
      },
      complete: () => {
        this.startDateSubject.next(null);
        this.endDateSubject.next(null);
        this.loadingSubject.next(false);

      }
    });
  }

  getRooms(): Room[] {
    return this.roomsSubject.value;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }

  setStartDate(startDate: Date | null) {
    this.startDateSubject.next(startDate);
  }

  setEndDate(endDate: Date | null) {
    this.endDateSubject.next(endDate);
  }
}
