import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { UrunMiktarTur } from '../../models/urun-miktar-tur.model';
import { UrunService } from '../../services/urun.service';
import { Urun } from '../../models/urun.model';
import { conditionalRequiredValidator } from '../../validators/conditional-required.validator';

@Component({
  selector: 'app-urun-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownModule, InputTextModule, ButtonModule,],
  templateUrl: './urun-form.component.html',
  styleUrls: ['./urun-form.component.css']
})
export class UrunFormComponent implements OnInit {

  @Output() setKaydetUrun:EventEmitter<Urun> = new EventEmitter();

  urunMiktarTurList: UrunMiktarTur[] = [];
  data: Urun = { id: 0, ad: '', miktarTurId:0  } as Urun;

  private _urunService: UrunService;

  // frmUrun: FormGroup = new FormGroup({
  //   ad: new FormControl(),
  //   miktarTurId: new FormControl()
  // });

  frmUrun: FormGroup;

  constructor(private fb: FormBuilder) {
    this._urunService = inject(UrunService);

    this.frmUrun = this.fb.group({
      id:'',
      ad: ['', []],
      miktarTurId: ['', [conditionalRequiredValidator('ad','1')]]
    })

  }

  ngOnInit() {
    this.data = { id: 0, ad: '', miktarTurId: 0 };

    this.frmUrun.patchValue(this.data);

    this._urunService.getUrunMiktarTurListForDropDown().subscribe(resp => {
      this.urunMiktarTurList = resp.data;
    })

  }

  kaydet(item: Urun) {
debugger;
    if (this.frmUrun!.valid) {
      this._urunService.kaydetUrun(item).subscribe(resp => {
        //ilgili işlemler yapılacak
        this.setKaydetUrun.emit(resp.data);
      });
    }

  }


}
