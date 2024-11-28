import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Urun } from '../../models/urun.model';
import { ButtonModule } from 'primeng/button';
import { AlisVerisList } from '../../models/alisveris-list.model';
import { InputTextModule } from 'primeng/inputtext';
import { PersonelService } from '../../services/personel.service';
import { UrunService } from '../../services/urun.service';

@Component({
  selector: 'app-sepet-olustur',
  imports: [FormsModule, DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './sepet-olustur.component.html',
  styleUrl: './sepet-olustur.component.scss'
})
export class SepetOlusturComponent implements OnInit {
  @Input() personelId: number | undefined;

  @Output() sepetTamamlandi: EventEmitter<AlisVerisList[]> = new EventEmitter<AlisVerisList[]>();


  alisVerisList: AlisVerisList[] = [];
  urunList: Urun[] | undefined;
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
      this.alisVerisList = resp.personelSepetUrunList;
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
    else if (this.alisVerisList.filter(d => d.urunId == this.secilenUrunId).length > 0) {
      alert("bu ürün zaten ekli");
      return;
    }

    let secilenUrun = this.urunList?.filter(d => d.id == this.secilenUrunId)[0];

    this.alisVerisList.push({ id: 0, urunId: this.secilenUrunId, urunAd: secilenUrun?.ad!, miktar: 1 });

    this.secilenUrunId = undefined;



  }

  urunSil(urunId: number) {
    let index = this.alisVerisList.findIndex(d => d.urunId == urunId);
    this.alisVerisList.splice(index, 1);


    //this.alisVerisList = this.alisVerisList.filter(d => d.urunId != urunId);
  }
  sepetiTamamla() {
    this.sepetTamamlandi.emit(this.alisVerisList);
  }

}
