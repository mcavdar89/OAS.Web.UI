import { Component, inject, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Market } from '../../models/market.model';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  standalone: true,
  imports:  [DialogModule],
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {

  marketList: Market[] | undefined;
  seciliMarketId: number | undefined;

  urunVisible: boolean = false;
  private _marketService: MarketService;

  constructor() {
    this._marketService = inject(MarketService);
  }

  ngOnInit() {
    this._marketService.getMarketList().subscribe(resp => {
      this.marketList = resp.data;
    });

  }
  setMarketUrun(marketId: number) {
    this.seciliMarketId = marketId;
    this.urunVisible = true;

  }
}
