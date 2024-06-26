import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environenmt } from './environement/env';

@Injectable({
  providedIn: 'root'
})
export class DossierCondidatServiceService {



  private apiUrl = 'http://localhost:8080/SaveDossierCondidat';

  saveDossierCondidat(dossierCondidat: any, email: string, langueIds: number[]): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
     langueIds = [1];


     
    // Construct URL with query parameters
    const url = `${this.apiUrl}?email=${email}&langueIds=${langueIds}`;

    // Send dossierCondidat in the request body
    return this.http.post<any>(url, dossierCondidat, { headers: headers });
  }

  constructor( private http: HttpClient) { }
}
