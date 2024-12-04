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
import { DialogModule } from 'primeng/dialog';
import { UrunFormComponent } from '../urun-form/urun-form.component';

@Component({
  selector: 'app-market-stok',
  standalone: true,
  imports: [FormsModule, DropdownModule, InputTextModule, ButtonModule, DialogModule, UrunFormComponent],
  templateUrl: './market-stok.component.html',
  styleUrls: ['./market-stok.component.css'],

})
export class MarketStokComponent implements OnInit {

  @Input() marketId: number | undefined;

  marketUrunList: MarketUrun[] = [];

  guncellenecekUrun: MarketUrun | undefined;


  //dropdown için gerekli
  urunList: Urun[] | undefined;
  //dropdown ngModel
  secilenUrunId: number | undefined;

  urunFormVisible: boolean = false;



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


  stokUrunEkle() {
    if (!this.secilenUrunId) {
      alert("Lütfen bir ürün seçiniz");
      return;
    }
    let marketUrun: MarketUrun = {
      id: Guid.create().toString(),
      marketId: this.marketId!,
      urunId: this.secilenUrunId!,
      urunAd: this.urunList?.find(x => x.id == this.secilenUrunId)?.ad!,
      stok: 0,
      fiyat: 0,
      puan: 0
    }
    this.marketUrunList.push(marketUrun);
    this.secilenUrunId = undefined;
  }

  yeniUrunEkle() {
    this.urunFormVisible = true;
  }

  setGuncelle(item: MarketUrun) {
    this.guncellenecekUrun = { ...item };
  }
  vazgecGuncelle() {
    this.guncellenecekUrun = undefined;
  }
  kaydetMarketStok(item: MarketUrun) {
    this._marketService.kaydetMarketStok(this.guncellenecekUrun!).subscribe(resp => {
      debugger;
      if (resp.isSuccess) {
        let index = this.marketUrunList.findIndex(d => d.urunId == item.urunId);
        this.marketUrunList[index] = resp.data;
        this.guncellenecekUrun = undefined;
      } else {
        alert(resp.message);
      }

    });
  }


}
