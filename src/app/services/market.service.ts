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
    return this._http.get<ResultDto<Market[]>>("api/OAS/getmarketlist");
  }

  getMarketUrunList(marketId: number) :Observable<ResultDto<MarketUrun[]>>{
    return this._http.get<ResultDto<MarketUrun[]>>("api/OAS/getmarketurunlist/"+marketId)
  }

  kaydetMarketStok(item:MarketUrun):Observable<ResultDto<MarketUrun>>{
    return this._http.post<ResultDto<MarketUrun>>("api/OAS/kaydetmarketurun",item);
  }

}
