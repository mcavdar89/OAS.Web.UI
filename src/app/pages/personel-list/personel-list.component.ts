import { Component, OnInit } from '@angular/core';
import { Personel } from '../../models/personel.model';
import { SepetOlusturComponent } from '../sepet-olustur/sepet-olustur.component';
import { AlisVerisList } from '../../models/alisveris-list.model';

@Component({
  selector: 'app-personel-list',
  imports: [SepetOlusturComponent],
  templateUrl: './personel-list.component.html',
  styleUrl: './personel-list.component.scss'
})
export class PersonelListComponent implements OnInit {

  personelList: Personel[] | undefined;
  seciliPersonel: Personel | undefined;
  seciliSepetList: AlisVerisList[] | undefined;


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

    debugger;
    //kopyalarını oluştuturur
    // this.seciliPersonel = {...item};
    // this.seciliPersonel = Object.assign({}, item);
    //referansı alır
    this.seciliPersonel = {...item};
    if (!this.seciliPersonel.alisVerisList) {
      this.seciliPersonel.alisVerisList = [
        {
          id: 1,
          urunId: 1,
          urunAd: 'Elma',
          miktar: 1
        },
        {
          id: 2,
          urunId: 2,
          urunAd: 'Armut',
          miktar: 3
        }
      ];
    }

    this.seciliSepetList = [...this.seciliPersonel.alisVerisList];
    //kopyasını oluşturmanın diğer bir yolu
    //this.seciliSepetList = Object.assign([], this.seciliPersonel.alisVerisList);
    //bu şekilde de kopyasını oluşturabiliriz
    //Deep copy yapar
    //this.seciliSepetList = JSON.parse(JSON.stringify(this.seciliPersonel.alisVerisList));

    console.log('seçilen personel : ', item);
  }
  personelSepetiOlustu(item: AlisVerisList[]) {

    this.personelList!.filter(d => d.id == this.seciliPersonel?.id)[0].alisVerisList = item;


    this.seciliPersonel!.alisVerisList = item;

  }

}
