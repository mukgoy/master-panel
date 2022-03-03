import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBotuiScroll]'
})
export class BotuiScrollDirective {

  constructor(el: ElementRef) {
    setTimeout(() => {
      el.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }, 500 );
  }

}
