import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { RoomsApiResponse} from '../components/pages/rooms/rooms.types';



@Injectable({
  providedIn: 'root'
})
export class RoomsApiService {
  private apiUrl = 'https://hotel-dashboard-backend.onrender.com';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<RoomsApiResponse> {
    return this.http.get<RoomsApiResponse>(`${this.apiUrl}/rooms`);
  }

}
