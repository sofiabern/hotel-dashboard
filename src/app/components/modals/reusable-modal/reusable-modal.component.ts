import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ClientsApiService } from '../../../api-services/clients.service';
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';
import { Room } from '../../pages/rooms/rooms.types';
import { CheckInAndBookingData } from '../../pages/check-ins-bookings/check-ins-bookings.types';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { calculateTotalDiscountAndPrice, checkDateIntersection } from '../../../utils/checkInBookingCreation';



@Component({
  selector: 'app-reusable-modal-component',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './reusable-modal.component.html',
  styleUrl: './reusable-modal.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ReusableModalComponent {
  visitsAmount!: number;
  totalDiscount: number = 0;
  discounts = {
    regularCustomer: 0,
    military: 0,
    guardian: 0,
  };
  totalDayPrice: number = this.data.room.price;
  totalPrice!: number;
  passportNumber!: string;
  startDate!: Date;
  endDate!: Date;
  discountChecked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReusableModalComponent>,
    private clientsApiService: ClientsApiService,
    @Inject(MAT_DIALOG_DATA) public data: { room: Room, isCheckIn:boolean },
    private checkInsBookingsApiService: CheckInsBookingsApiService,
    private toastr: ToastrService
  ) { }

  submitForm(reusableForm: NgForm): void {
    if (!this.discountChecked) {
      this.toastr.error('Please fill all required fields marked by * and check discount.');
      return;
    }

    const { firstName, lastName, passportNumber, comment, middleName } = reusableForm.value;

    if (!firstName.trim() || !lastName.trim() || !passportNumber.trim() ) {
      this.toastr.error('Fields cannot contain only spaces or be empty.');
      return;
    }

    if (reusableForm.valid) {
      const hasIntersection = checkDateIntersection(this.startDate, this.endDate, this.data.room.bookingsAndCheckIns, this.toastr);
      if (hasIntersection) {
        return;
      }

      const data: CheckInAndBookingData = {
        last_name: lastName.trim(),
        first_name: firstName.trim(),
        passport_details: this.passportNumber.trim(),
        room: this.data.room._id,
        check_in_date: this.startDate,
        check_out_date: this.endDate,
        isCheckIn: this.data.isCheckIn,
        discounts: { ...this.discounts },
        ...calculateTotalDiscountAndPrice(this.discounts, this.data.room.price, this.startDate, this.endDate)
      };

      if (comment.trim()) {
        data.comment = comment;
      }

      if (middleName.trim()) {
        data.middle_name = middleName;
      }

      this.checkInsBookingsApiService.createCheckInBooking(data).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.toastr.success(`${this.data.isCheckIn ? "Check-in" : "Booking"} created successfully!`);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Failed to create booking.');
        }
      });
    }
  }

  onCheckDiscount(): void {
    if (!this.passportNumber) {
      this.toastr.error('Please enter passport number to check discount.');
      return;
    }

    this.clientsApiService.getClientVisits({ passport_details: this.passportNumber }).subscribe({
      next: (response) => {
        this.visitsAmount = response.data;
        this.discountChecked = true;
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Error fetching client visits. Please try again later.');
      }
    });
  }

  onDiscountChange(type: string, isChecked: boolean): void {
    switch (type) {
      case 'regularCustomer':
        this.discounts.regularCustomer = isChecked ? 15 : 0;
        break;
      case 'military':
        this.discounts.military = isChecked ? 30 : 0;
        break;
      case 'guardian':
        this.discounts.guardian = isChecked ? 10 : 0;
        break;
    }
    this.updateTotalPrices();
  }

  updateTotalPrices(): void {
    const { totalDiscount, totalDayPrice, totalPrice } = calculateTotalDiscountAndPrice(this.discounts, this.data.room.price, this.startDate, this.endDate);
    this.totalDiscount = totalDiscount;
    this.totalDayPrice = totalDayPrice;
    this.totalPrice = totalPrice;
  }

  calculateTotalDiscountAndPrice(): void {
    this.updateTotalPrices();
  }
}

