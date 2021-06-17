import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImgBanner]'
})
export class ImgBannerDirective {

  @Input() set appImgBanner(value){
    switch(value){
      case "Profesional":
        this.el.nativeElement.style.border = '2px solid Tomato';
        break;
      case "Administrativo":
        this.el.nativeElement.style.border = '2px solid MediumSeaGreen';
        break;
      case "Paciente":
        this.el.nativeElement.style.border = '2px solid DodgerBlue';
        break;
      default:
        this.el.nativeElement.style.border = '';
        break;
    }
    
    //this.el.nativeElement.innerHTML ="Sistema adaptado para el usuario: "+value
  }
  constructor(private el: ElementRef) {
   }

}
