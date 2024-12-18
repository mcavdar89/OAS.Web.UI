import { Component, inject, OnInit } from '@angular/core';
import { Personel } from '../../models/personel.model';
import { SepetOlusturComponent } from '../sepet-olustur/sepet-olustur.component';

import { PersonelService } from '../../services/personel.service';
import { DialogModule } from 'primeng/dialog';
import { MaskelePipe } from '../../pipes/maskele.pipe';

@Component({
  selector: 'app-personel-list',
  imports: [SepetOlusturComponent, DialogModule,MaskelePipe],
  templateUrl: './personel-list.component.html',
  styleUrl: './personel-list.component.scss'
})
export class PersonelListComponent implements OnInit {

  personelList: Personel[] | undefined;
  seciliPersonel: Personel | undefined;

  private _service: PersonelService;

  sepetVisible: boolean = false;

  //injection ları yönetiriz
  constructor() {
    this._service = inject(PersonelService);
  }

  //ilgili list  veya yüklenmesi gereken verileri burada yükleriz
  ngOnInit(): void {
    console.log('personel ngOnInit çalıştı');
    this._service.getPersonelList().subscribe(resp => {
      if (resp.isSuccess)
        this.personelList = resp.data;
      else
        alert(resp.message);

      console.log('personel listesi : ', this.personelList);  //gelen verileri ne ise onu yazdırır

    });
    console.log('personel ngOnInit bitti');

  }
  setPersonelSepet(item: Personel) {

    console.log('seçilen personel : ', item);
    this.seciliPersonel = item;
    this.sepetVisible = true;

    //açıklamlar

    //kopyalarını oluştuturur
    // this.seciliPersonel = {...item};
    // this.seciliPersonel = Object.assign({}, item);
    //referansı alır
    //this.seciliPersonel = { ...item };


    //this.seciliSepetList = [...this.seciliPersonel.alisVerisList];
    //kopyasını oluşturmanın diğer bir yolu
    //this.seciliSepetList = Object.assign([], this.seciliPersonel.alisVerisList);
    //bu şekilde de kopyasını oluşturabiliriz
    //Deep copy yapar
    //this.seciliSepetList = JSON.parse(JSON.stringify(this.seciliPersonel.alisVerisList));




  }
  sepetTamalandi(sepetLength: number) {
    this.personelList!.filter(d => d.id == this.seciliPersonel!.id)[0].sepetUrunSayisi = sepetLength;
    setTimeout(() => {
      this.sepetVisible = false;
    }, 1000);

  }

}
