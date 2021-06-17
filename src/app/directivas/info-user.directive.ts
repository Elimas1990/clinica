import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInfoUser]'
})
export class InfoUserDirective {

  @Input() set appInfoUser(value){

    this.el.nativeElement.innerHTML ="Sistema adaptado para el usuario: "+value
  }
  constructor(private el: ElementRef) {
   }

}
