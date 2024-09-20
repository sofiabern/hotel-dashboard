import { Component, Input } from '@angular/core';
import { CheckInBooking } from '../check-ins-bookings.types';
import { CheckInBookingCardComponent } from '../check-in-booking-card/check-in-booking-card.component';



@Component({
  selector: 'app-check-ins-bookings-list',
  standalone: true,
  imports: [ CheckInBookingCardComponent],
  templateUrl: './check-ins-bookings-list.component.html',
  styleUrl: './check-ins-bookings-list.component.css'
})
export class CheckInsBookingsListComponent {
  @Input() checkInsBookings: CheckInBooking[] = [];
}
