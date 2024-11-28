import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Urun } from '../../models/urun.model';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { PersonelService } from '../../services/personel.service';
import { UrunService } from '../../services/urun.service';
import { PersonelSepet } from '../../models/personel-sepet';

@Component({
  selector: 'app-sepet-olustur',
  imports: [FormsModule, DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './sepet-olustur.component.html',
  styleUrl: './sepet-olustur.component.scss'
})
export class SepetOlusturComponent implements OnInit {
  @Input() personelId: number | undefined;

  @Output() sepetTamamlandi: EventEmitter<number> = new EventEmitter<number>();


  personelSepet: PersonelSepet | undefined;
  //dropdown için gerekli
  urunList: Urun[] | undefined;

  //dropdown ngModel
  secilenUrunId: number | undefined;

  private _personelService: PersonelService;
  private _urunService: UrunService;

  constructor() {

    this._personelService = inject(PersonelService);
    this._urunService = inject(UrunService);

    console.log("SepetOlusturComponent constructor çalıştı");
  }

  ngOnInit(): void {

    this._personelService.getPersonelSepet(this.personelId!).subscribe(resp => {
      debugger;
      if (resp.isSuccess)
        this.personelSepet = resp.data
      else
        alert(resp.message);
    });

    this._urunService.getUrunListForDropDown().subscribe(resp => {
      this.urunList = resp.data;
    });


  }

  urunEkle() {
    if (!this.secilenUrunId) {
      alert("önce ürün seçmeniz gerekiyor!");
      return;
    }
    else if (this.personelSepet!.personelSepetUrunList!.filter(d => d.urunId == this.secilenUrunId).length > 0) {
      alert("bu ürün zaten ekli");
      return;
    }

    let secilenUrun = this.urunList?.filter(d => d.id == this.secilenUrunId)[0];
/*
id: string
    personelSepetId: string
    urunId: number
    urunAd: string
    miktar: number
    tutar: number
*/
    this.personelSepet?.personelSepetUrunList.push({ id: 'as',personelSepetId:this.personelSepet.id, urunId: this.secilenUrunId, urunAd: secilenUrun!.ad!, miktar: 1, tutar: 0 });

    this.secilenUrunId = undefined;



  }

  urunSil(urunId: number) {
    // let index = this.personelSepet?.personelSepetUrunList.findIndex(d => d.urunId == urunId);
    // this.personelSepet?.personelSepetUrunList.splice(index!, 1);


    this.personelSepet!.personelSepetUrunList = this.personelSepet!.personelSepetUrunList.filter(d => d.urunId != urunId);
  }
  sepetiTamamla() {
    this.sepetTamamlandi.emit(this.personelSepet!.personelSepetUrunList.length);
  }

}
