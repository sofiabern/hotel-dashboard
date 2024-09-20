import { Component, Input } from '@angular/core';
import { Room } from '../rooms.types';
import { RoomsService } from '../rooms.service';
import { MatDialog } from '@angular/material/dialog';
import { ReusableModalComponent } from '../../../modals/reusable-modal/reusable-modal.component';



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
  ) { }

  openModal(room: Room, type: 'checkIn' | 'booking'): void {
    const isCheckIn = type === 'checkIn';

    const dialogRef = this.dialog.open(ReusableModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: { room, isCheckIn }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { startDate, endDate, comfortLevel } = this.roomsService.getFilterState();
        this.roomsService.fetchRooms(startDate, endDate, comfortLevel);
      }
    });
  }

}
