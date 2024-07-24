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

  private filterState = {
    startDate: undefined as string| undefined,
    endDate: undefined as string | undefined,
    comfortLevel: undefined as string | undefined
  };

  constructor(private roomsApiService: RoomsApiService, private toastr: ToastrService) { }

  fetchRooms(startDate?: string, endDate?: string, comfortLevel?: string) {
    this.loadingSubject.next(true);
    this.roomsApiService.getRooms(startDate, endDate, comfortLevel).subscribe({
      next: (response) => {
        this.roomsSubject.next(response.data);
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.toastr.error('Oops! Something went wrong while fetching rooms.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

  setFilterState(startDate?: string, endDate?: string, comfortLevel?: string) {
    this.filterState.startDate = startDate;
    this.filterState.endDate = endDate;
    this.filterState.comfortLevel = comfortLevel;
  }

  getFilterState() {
    return this.filterState;
  }


  getRooms(): Room[] {
    return this.roomsSubject.value;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}