import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Form
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

// Types
import { Room } from '../rooms.types';

// Services
import { RoomsService } from '../rooms.service';

// Etc
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

  constructor(private roomsService: RoomsService, private toastr: ToastrService) {}

  ngOnInit() {
    const filterState = this.roomsService.getFilterState();
    this.startDate = filterState.startDate;
    this.endDate = filterState.endDate;
    this.comfortLevel = filterState.comfortLevel;
  }

  applyFilter() {

    
    this.roomsService.setFilterState(this.startDate, this.endDate, this.comfortLevel);
    this.roomsService.fetchRooms(this.startDate, this.endDate, this.comfortLevel);
  }

  resetFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.comfortLevel = undefined;
    this.roomsService.setFilterState();
    
  }
}
