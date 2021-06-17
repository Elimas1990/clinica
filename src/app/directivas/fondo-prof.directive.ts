import { Directive, ElementRef,HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFondoProf]'
})
export class FondoProfDirective {

  @Input() appFondoProf;

  constructor(private el: ElementRef) {
    //this.el.nativeElement.style.backgroundColor = this.appFondoProf;
   }
  
   @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appFondoProf);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
