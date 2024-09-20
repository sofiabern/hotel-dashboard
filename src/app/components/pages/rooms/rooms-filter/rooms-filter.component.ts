import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-rooms-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatDatepickerModule, MatOptionModule, MatSelectModule],
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class RoomsFilterComponent implements OnInit {
  startDate?: string;
  endDate?: string;
  comfortLevel?: string;
  loading: boolean = false;

  constructor(private roomsService: RoomsService, private toastr: ToastrService) {}

  ngOnInit() {
    const filterState = this.roomsService.getFilterState();
    this.startDate = filterState.startDate;
    this.endDate = filterState.endDate;
    this.comfortLevel = filterState.comfortLevel;
    this.roomsService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  applyFilter() {


    this.roomsService.setFilterState(this.startDate, this.endDate, this.comfortLevel);
    this.roomsService.fetchRooms(this.startDate, this.endDate, this.comfortLevel);
  }

  resetFilter() {
    window.location.reload();
  }
}
