import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {

  private http: HttpClient

  constructor() {
    this.http = inject(HttpClient);
  }

  getPersonelList(): Observable<any> {
    return this.http.get("http://localhost:5100/api/OAS/getpersonellist");
  }
  getPersonelSepet(personelId: number): Observable<any> {
    return this.http.get("http://localhost:5100/api/OAS/getpersonelsepet/" + personelId);
  }
}
