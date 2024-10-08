import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomsFilterComponent } from './rooms-filter/rooms-filter.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.types';
import { LoaderComponent } from '../../loader/loader.component';


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomsFilterComponent, RoomsListComponent, LoaderComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})

export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  startDate?: string;
  endDate?: string;
  comfortLevel?: string;
  loading: boolean = false;

  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    this.roomsService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.roomsService.rooms$.subscribe((rooms) => {
      this.rooms = rooms;
    });
    this.loadFilteredRooms();
  }

  onFilterSubmit() {
    this.roomsService.setFilterState(this.startDate, this.endDate, this.comfortLevel);
    this.loadFilteredRooms();
  }

  loadFilteredRooms() {
    const { startDate, endDate, comfortLevel } = this.roomsService.getFilterState();
    this.roomsService.fetchRooms(startDate, endDate, comfortLevel);
  }
}
