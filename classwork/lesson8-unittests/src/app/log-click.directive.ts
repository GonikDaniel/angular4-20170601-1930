import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appLogClick]'
})
export class LogClickDirective {

   public couter: number = 0;
   @Output() changes = new EventEmitter();

   @HostListener('click', ['$event.target'])
   onclick(target) {
     this.couter++;
     console.log(target);
     this.changes.emit(this.couter);
   }
}
