import { Component, inject, Input, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { MarketUrun } from '../../models/market-urun.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Urun } from '../../models/urun.model';
import { UrunService } from '../../services/urun.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-market-stok',
  standalone: true,
  imports: [FormsModule, DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './market-stok.component.html',
  styleUrls: ['./market-stok.component.css'],

})
export class MarketStokComponent implements OnInit {

  @Input() marketId: number | undefined;

  marketUrunList: MarketUrun[] = [];
  //dropdown için gerekli
  urunList: Urun[] | undefined;
  //dropdown ngModel
  secilenUrunId: number | undefined;


  private _marketService: MarketService;
  private _urunService: UrunService;
  constructor() {
    this._marketService = inject(MarketService);
    this._urunService = inject(UrunService);
  }

  ngOnInit() {
    this._marketService.getMarketUrunList(this.marketId!).subscribe(resp => {
      debugger;
      this.marketUrunList = resp.data;
    });

    this._urunService.getUrunListForDropDown().subscribe(resp => {
      this.urunList = resp.data;
    });
  }


  urunEkle(){
    if(!this.secilenUrunId){
      alert("Lütfen bir ürün seçiniz");
      return;
    }
    let marketUrun:MarketUrun = {
      id:Guid.create().toString(),
      marketId:this.marketId!,
      urunId:this.secilenUrunId!,
      urunAd:this.urunList?.find(x=>x.id==this.secilenUrunId)?.ad!,
      stok:0,
      fiyat:0,
      puan:0
    }
    this.marketUrunList.push(marketUrun);
    this.secilenUrunId = undefined;
  }

  eksiKontrolu(deger:number){
    if(deger<0){
      alert("Stok miktarı 0'dan küçük olamaz");
    
      return 0;
    }
    return deger;
  }


}
