import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { CheckInBooking,  CheckInAndBookingData, CheckInBookingApiResponse, CheckInsBookingsPaginationApiResponse } from '../components/pages/check-ins-bookings/check-ins-bookings.types';



@Injectable({
  providedIn: 'root'
})
export class CheckInsBookingsApiService {
  private apiUrl = 'https://hotel-dashboard-backend.onrender.com';

  constructor(private http: HttpClient) { }

  getCheckIns(page: number = 1, perPage: number = 6, filter: string): Observable<CheckInsBookingsPaginationApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());

    if (filter.trim()) {
      params = params.set('filter', filter);
    }

    return this.http.get<CheckInsBookingsPaginationApiResponse>(`${this.apiUrl}/check-ins`, { params });
  }


  createCheckIn(formData: CheckInAndBookingData): Observable<CheckInBookingApiResponse> {
    return this.http.post<CheckInBookingApiResponse>(`${this.apiUrl}/check-ins`, formData);
  }

  updateCheckIn(checkInId: string, updateData:Partial<CheckInBooking>):Observable<CheckInBookingApiResponse>{
    return this.http.patch<CheckInBookingApiResponse>(`${this.apiUrl}/check-ins/${checkInId}`, updateData);
  }

  deleteCheckIn(checkInId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/check-ins/${checkInId}`);
  }
}
