import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBotuiFocus]'
})
export class BotuiFocusDirective {

  constructor(el: ElementRef) {
    setTimeout(() => {
      el.nativeElement.focus();
    }, 500 );
  }
}
