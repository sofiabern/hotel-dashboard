import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { ClientsApiResponse, VisitsApiResponse, PassportDetails, ClientsPaginationApiResponse } from '../components/pages/clients/clients.types';



@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  private apiUrl = 'https://hotel-dashboard-backend.onrender.com';

  constructor(private http: HttpClient) { }

  getClients(page: number = 1, perPage: number = 6, filter: string): Observable<ClientsPaginationApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());

    if (filter.trim()) {
      params = params.set('filter', filter);
    }

    return this.http.get<ClientsPaginationApiResponse>(`${this.apiUrl}/clients`, { params });
  }

  getClientVisits(passportDetails: PassportDetails): Observable<VisitsApiResponse> {
    return this.http.post<VisitsApiResponse>(`${this.apiUrl}/clients/visits`, passportDetails)
  }
}
