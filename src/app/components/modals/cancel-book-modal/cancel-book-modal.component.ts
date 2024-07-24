import { Component, Inject } from '@angular/core';

// Services
import { CheckInsBookingsService } from '../../pages/check-ins-bookings/check-ins-bookings.service';

// Modal
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-cancel-book-modal',
  standalone: true,
  imports: [],
  templateUrl: './cancel-book-modal.component.html',
  styleUrls: ['./cancel-book-modal.component.css']
})
export class CancelBookModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CancelBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      checkInBookingId: string,
      checkInBookingFirstName: string,
      checkInBookingMiddleName: undefined | string,
      checkInBookingLastName: string,
      checkInBookingRoomNumber: number
    },
    private checkInsBookingsService: CheckInsBookingsService,
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.checkInsBookingsService.cancelCheckIn(this.data.checkInBookingId);
    this.dialogRef.close();
  };
}
