import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnyPozitifNumber]'
})
export class OnyPozitifNumberDirective {

  constructor(public el: ElementRef) { }


  @HostListener('keydown',['$event'])
  onKeydown(event:KeyboardEvent){
    if(event.key=='-' || event.key=='.'){
      event.preventDefault();
    }
  }
  @HostListener('blur',['$event'])
  onMouseLeave(event:MouseEvent){
 
    if(this.el.nativeElement.value<0){
      this.el.nativeElement.value=this.el.nativeElement.value*-1;
    }

    console.log("Mouse Leave");
  }

}
