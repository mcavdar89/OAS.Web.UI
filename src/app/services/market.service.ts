import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultDto } from '../models/result-dto.model';
import { Market } from '../models/market.model';
import { MarketUrun } from '../models/market-urun.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private _http: HttpClient
  constructor() {
    this._http = inject(HttpClient);
  }

  getMarketList() :Observable<ResultDto<Market[]>>{
    return this._http.get<ResultDto<Market[]>>("http://localhost:5100/api/OAS/getmarketlist");
  }

  getMarketUrunList(marketId: number) :Observable<ResultDto<MarketUrun[]>>{
    return this._http.get<ResultDto<MarketUrun[]>>("http://localhost:5100/api/OAS/getmarketurunlist/"+marketId)
  }

}
