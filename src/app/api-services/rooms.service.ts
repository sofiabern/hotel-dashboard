import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { RoomsApiResponse} from '../components/pages/rooms/rooms.types';



@Injectable({
  providedIn: 'root'
})
export class RoomsApiService {
  private apiUrl = 'https://hotel-dashboard-backend.onrender.com';

  constructor(private http: HttpClient) { }

  getRooms(checkInDate?: string, checkOutDate?: string, comfortLevel?: string): Observable<RoomsApiResponse> {
    let params = new HttpParams();
    
    if (checkInDate) {
      params = params.append('checkInDate', checkInDate);
    }
    if (checkOutDate) {
      params = params.append('checkOutDate', checkOutDate);
    }
    if (comfortLevel) {
      params = params.append('comfortLevel', comfortLevel);
    }

    return this.http.get<RoomsApiResponse>(`${this.apiUrl}/rooms`, { params });
  }
}
