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
import { CommonModule } from '@angular/common';
import { ParaPipe } from '../../pipes/para.pipe';

@Component({
  selector: 'app-market-stok',
  standalone: true,
  imports: [FormsModule,CommonModule, DropdownModule, InputTextModule, ButtonModule, DialogModule, UrunFormComponent,ParaPipe],
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

  isLoading:boolean = false;


  constructor() {
    this._marketService = inject(MarketService);
    this._urunService = inject(UrunService);
  }

  ngOnInit() {
    this._marketService.getMarketUrunList(this.marketId!).subscribe(resp => {
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
      //ürün kaydedilmeden id oluşmayacak
      //id: Guid.create().toString(),
      marketId: this.marketId!,
      urunId: this.secilenUrunId!,
      urunAd: this.urunList?.find(x => x.id == this.secilenUrunId)?.ad!,
      stok: 0,
      fiyat: 0,
      puan: 0
    }
    this.marketUrunList.push(marketUrun);
    this.secilenUrunId = undefined;
    this.guncellenecekUrun = {...marketUrun}
  }

  yeniUrunEkle() {
    this.urunFormVisible = true;
  }

  setGuncelle(item: MarketUrun) {
    this.guncellenecekUrun = { ...item };
  }
  vazgecGuncelle() {
    if(!this.guncellenecekUrun?.id){
      this.marketUrunList = this.marketUrunList.filter(d=>d.id)
    }   
    
    this.guncellenecekUrun = undefined;

  }
  kaydetMarketStok(item: MarketUrun) {
    this.isLoading = true;
    this._marketService.kaydetMarketStok(this.guncellenecekUrun!).subscribe(resp => {

      if (resp.isSuccess) {
        let index = this.marketUrunList.findIndex(d => d.urunId == item.urunId);
        this.marketUrunList[index] = resp.data;
        this.guncellenecekUrun = undefined;
      } else {
        alert(resp.message);
      }
      this.isLoading = false;
    });
  }
  setKaydetUrun(item:Urun){
    this.urunList?.push(item);
    this.secilenUrunId = item.id;
    this.urunFormVisible = false;
  }

}
