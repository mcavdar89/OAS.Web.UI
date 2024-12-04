import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultDto } from '../models/result-dto.model';
import { Urun } from '../models/urun.model';
import { UrunMiktarTur } from '../models/urun-miktar-tur.model';

@Injectable({
  providedIn: 'root'
})
export class UrunService {
  private _http: HttpClient;
  constructor() {
    this._http = inject(HttpClient);
  }

  getUrunListForDropDown(): Observable<ResultDto<Urun[]>> {
    return this._http.get<ResultDto<Urun[]>>("http://localhost:5100/api/OAS/geturunlistfordropdown");
  }
  getUrunMiktarTurListForDropDown(): Observable<ResultDto<UrunMiktarTur[]>> {
    return this._http.get<ResultDto<UrunMiktarTur[]>>("http://localhost:5100/api/OAS/getmiktarturlistfordropdown");
  }


}
