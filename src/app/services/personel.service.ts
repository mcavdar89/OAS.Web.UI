import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultDto } from '../models/result-dto.model';
import { Personel } from '../models/personel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {

  private http: HttpClient

  constructor() {
    this.http = inject(HttpClient);
  }

  getPersonelList(): Observable<ResultDto<Personel[]>> {
    return this.http.get<ResultDto<Personel[]>>("http://localhost:5100/api/OAS/getpersonellist");
  }
  getPersonelSepet(personelId: number): Observable<ResultDto<>> {
    return this.http.get("http://localhost:5100/api/OAS/getpersonelsepet/" + personelId);
  }
}
