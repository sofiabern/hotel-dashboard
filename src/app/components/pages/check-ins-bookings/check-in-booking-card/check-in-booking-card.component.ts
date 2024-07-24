import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CheckInBookingButtonsComponent } from '../check-in-booking-buttons/check-in-booking-buttons.component';

// Types
import { CheckInBooking } from '../check-ins-bookings.types';



@Component({
  selector: 'app-check-in-booking-card',
  standalone: true,
  imports: [CommonModule, CheckInBookingButtonsComponent],
  templateUrl: './check-in-booking-card.component.html',
  styleUrl: './check-in-booking-card.component.css'
})
export class CheckInBookingCardComponent {
  @Input() checkInBooking!: CheckInBooking;
}
