import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStokAlarm]'
})
export class StokAlarmDirective implements OnChanges {

  @Input() appStokAlarm: number | any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  
    if (this.appStokAlarm < 10) {
      this.alarmStok = true;
    } else {
      this.alarmStok = false;
    }
  }

  @HostBinding('class.alarm-stok') alarmStok: boolean = false;





}
