import { Component, Input } from '@angular/core';
import { CancelBookModalComponent } from '../../../modals/cancel-book-modal/cancel-book-modal.component';
import { CheckInBooking } from '../check-ins-bookings.types';
import { CheckInsBookingsService } from '../check-ins-bookings.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-check-in-booking-buttons',
  standalone: true,
  imports: [],
  templateUrl: './check-in-booking-buttons.component.html',
  styleUrl: './check-in-booking-buttons.component.css'
})
export class CheckInBookingButtonsComponent {
  @Input() checkInBooking!: CheckInBooking

  constructor(private checkInsBookingsService: CheckInsBookingsService, private dialog: MatDialog) { }


  onApprove(checkInId: string) {
    this.checkInsBookingsService.approveCheckIn(checkInId);
  }

  openCancelModal(checkInBookingId: string, checkInBookingFirstName: string, checkInBookingMiddleName: string | undefined, checkInBookingLastName: string, checkInBookingRoomNumber: number, isCheckIn: boolean): void {
    const dialogBookRef = this.dialog.open(CancelBookModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        checkInBookingId, checkInBookingFirstName,
        checkInBookingMiddleName,
        checkInBookingLastName,
        checkInBookingRoomNumber,
        isCheckIn
      }
    });

    dialogBookRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkInsBookingsService.fetchCheckIns();
      }
    });
  }
}
