import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Form
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

// Types
import { Room } from '../rooms.types';

// Services
import { RoomsService } from '../rooms.service';

// Etc
import { ToastrService } from 'ngx-toastr';
import { isBefore, isAfter, isEqual } from 'date-fns';



@Component({
  selector: 'app-rooms-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class RoomsFilterComponent implements OnInit {
  @Input() rooms!: Room[];
  @Output() filteredRoomsChange = new EventEmitter<Room[]>();
  startDate!: Date | null;
  endDate!: Date | null;

  constructor(private roomsService: RoomsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.roomsService.startDate$.subscribe(startDate => {
      this.startDate = startDate;
    });
    this.roomsService.endDate$.subscribe(endDate => {
      this.endDate = endDate;
    });
  }

  onSubmit() {
    if(!this.startDate || !this.endDate){
      return this.toastr.error('Please specify both start and end dates.');
    }

      const filteredRooms = this.filterRoomsByDate(this.startDate, this.endDate);
     return this.filteredRoomsChange.emit(filteredRooms);

  }

  private filterRoomsByDate(startDate: Date, endDate: Date): Room[] {
    return this.rooms.filter(room => {
      return !room.bookingsAndCheckIns.some((item: { check_in_date: Date, check_out_date: Date }) => {

        const bookingCheckInDate = new Date(item.check_in_date);
        const bookingCheckOutDate = new Date(item.check_out_date);

        return (isBefore(startDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate)) ||
          isEqual(startDate, bookingCheckInDate) || isEqual(endDate, bookingCheckOutDate) ||
          isEqual(endDate, bookingCheckInDate) || isEqual(startDate, bookingCheckOutDate) ||
          (isBefore(startDate, bookingCheckOutDate) && isAfter(startDate, bookingCheckInDate)) ||
          (isBefore(endDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate));
      });
    });
  }
}
