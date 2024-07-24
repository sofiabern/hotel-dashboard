import { Component, Input } from '@angular/core';

// Componenets
import { BookModalComponent } from '../../../modals/book-modal/book-modal.component';
import { CheckInModalComponent } from '../../../modals/check-in-modal/check-in-modal.component';

// Types
import { Room } from '../rooms.types';

// Services
import { RoomsService } from '../rooms.service';

// Modal
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-room-buttons',
  standalone: true,
  imports: [],
  templateUrl: './room-buttons.component.html',
  styleUrl: './room-buttons.component.css'
})
export class RoomButtonsComponent {
  @Input() room!: Room;

  constructor(
    private dialog: MatDialog,
    private roomsService: RoomsService
  ) {}

  openBookModal(room: Room): void {
    const dialogBookRef = this.dialog.open(BookModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: { room }
    });

    dialogBookRef.afterClosed().subscribe(result => {
      if (result) {
        const { startDate, endDate, comfortLevel } = this.roomsService.getFilterState();
        this.roomsService.fetchRooms(startDate, endDate, comfortLevel);
      }
    });
  }

  openCheckInModal(room: Room): void {
    const dialogCheckInRef = this.dialog.open(CheckInModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: { room }
    });

    dialogCheckInRef.afterClosed().subscribe(result => {
      if (result) {
        const { startDate, endDate, comfortLevel } = this.roomsService.getFilterState();
        this.roomsService.fetchRooms(startDate, endDate, comfortLevel);
      }
    });
  }
}