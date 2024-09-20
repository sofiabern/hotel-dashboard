import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckInsBookingsService } from '../check-ins-bookings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-check-ins-bookings-filter',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, FormsModule],
  templateUrl: './check-ins-bookings-filter.component.html',
  styleUrl: './check-ins-bookings-filter.component.css'
})
export class CheckInsBookingsFilterComponent implements OnInit {
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private checkInsBookingsService: CheckInsBookingsService) {}

  ngOnInit() {
    this.searchTerm = this.checkInsBookingsService.getFilter();
    this.checkInsBookingsService.loading$.subscribe(loading => this.loading = loading);

  }

  applyFilter() {
    this.checkInsBookingsService.setFilter(this.searchTerm);
    this.checkInsBookingsService.fetchCheckIns(1, this.checkInsBookingsService.getPerPage(), this.searchTerm);
  }

  resetFilter() {
    window.location.reload();
  }
}
