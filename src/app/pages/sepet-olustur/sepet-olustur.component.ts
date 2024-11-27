import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Urun } from '../../models/urun.model';
import { ButtonModule } from 'primeng/button';
import { AlisVerisList } from '../../models/alisveris-list.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sepet-olustur',
  imports: [FormsModule, DropdownModule,InputTextModule,  ButtonModule],
  templateUrl: './sepet-olustur.component.html',
  styleUrl: './sepet-olustur.component.scss'
})
export class SepetOlusturComponent implements OnInit {
  @Input() alisVerisList: AlisVerisList[] = [];

  @Output() sepetTamamlandi: EventEmitter<AlisVerisList[]> = new EventEmitter<AlisVerisList[]>();



  urunList: Urun[] | undefined;
  secilenUrunId: number | undefined;

  constructor() {
    console.log("SepetOlusturComponent constructor çalıştı");
  }

  ngOnInit(): void {
    console.log("SepetOlusturComponent ngOnInit çalıştı");
    this.urunList = [
      { id: 1, ad: 'Elma', miktarTuru: 'Kg' },
      { id: 2, ad: 'Armut', miktarTuru: 'Kg' },
      { id: 3, ad: 'Karpuz', miktarTuru: 'Adet' },
      { id: 4, ad: 'Muz', miktarTuru: 'Kg' },
      { id: 5, ad: 'Portakal', miktarTuru: 'Kg' },
      { id: 6, ad: 'Mandalina', miktarTuru: 'Kg' },
      { id: 7, ad: 'Çilek', miktarTuru: 'Kg' },
      { id: 8, ad: 'Kiraz', miktarTuru: 'Kg' },
      { id: 9, ad: 'Üzüm', miktarTuru: 'Kg' },
      { id: 10, ad: 'Şeftali', miktarTuru: 'Kg' },

    ]


  }

  urunEkle() {
    if (!this.secilenUrunId) {
      alert("önce ürün seçmeniz gerekiyor!");
      return;
    }
    else if (this.alisVerisList.filter(d => d.urunId == this.secilenUrunId).length > 0) {
      alert("bu ürün zaten ekli");
      return;
    }

    let secilenUrun = this.urunList?.filter(d => d.id == this.secilenUrunId)[0];

    this.alisVerisList.push({ id: 0, urunId: this.secilenUrunId, urunAd: secilenUrun?.ad!,miktar:1 });

    this.secilenUrunId = undefined;



  }

  urunSil(urunId: number) {
    let index = this.alisVerisList.findIndex(d => d.urunId == urunId);
    this.alisVerisList.splice(index, 1);

    
    //this.alisVerisList = this.alisVerisList.filter(d => d.urunId != urunId);
  }
  sepetiTamamla(){
    this.sepetTamamlandi.emit(this.alisVerisList);
  }

}
