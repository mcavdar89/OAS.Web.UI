import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { UrunMiktarTur } from '../../models/urun-miktar-tur.model';
import { UrunService } from '../../services/urun.service';
import { Urun } from '../../models/urun.model';

@Component({
  selector: 'app-urun-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,  FormsModule, DropdownModule, InputTextModule, ButtonModule,],
  templateUrl: './urun-form.component.html',
  styleUrls: ['./urun-form.component.css']
})
export class UrunFormComponent implements OnInit {

  urunMiktarTurList: UrunMiktarTur[] = [];
  data: Urun = { id: 0, ad: '', miktarTurId: 0 } as Urun;

  private _urunService: UrunService;
  constructor() {
    this._urunService = inject(UrunService);
  }

  ngOnInit() {

    this._urunService.getUrunMiktarTurListForDropDown().subscribe(resp => {
      this.urunMiktarTurList = resp.data;
    })

  }

  kaydet(frmUrun:any){
    debugger;
    console.log(frmUrun);
    if(frmUrun.valid){

    }

  }


}
