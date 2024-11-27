import { Component, OnInit } from '@angular/core';
import { Personel } from '../models/personel.model';
import { SepetOlusturComponent } from '../sepet-olustur/sepet-olustur.component';

@Component({
  selector: 'app-personel-list',
  imports: [SepetOlusturComponent],
  templateUrl: './personel-list.component.html',
  styleUrl: './personel-list.component.scss'
})
export class PersonelListComponent implements OnInit {

  personelList: Personel[] | undefined;
  seciliPersonel: Personel | undefined;


  //injection ları yönetiriz
  constructor() { }

  //ilgili list  veya yüklenmesi gereken verileri burada yükleriz
  ngOnInit(): void {
    this.personelList = [
      {
        id: 1,
        ad: 'Ali',
        soyad: 'DEMİRKIRAN',
        birimId: 1,
        birimAd: 'Yazılım',
      },
      {
        id: 2,
        ad: 'Veli',
        soyad: 'ÜSTÜN',
        birimId: 2,
        birimAd: 'Yazılım',
      },
      {
        id: 3,
        ad: 'Ayşe',
        soyad: 'KAYA',
        birimId: 3,
        birimAd: 'Yazılım',
      }
    ]
  }

  personelAlisVerisListesiGetir(item: Personel) {
    this.seciliPersonel = item;
  }

}
