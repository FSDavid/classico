import {Directive, Renderer2, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appOutclick]'
})
export class OutclickDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @Output() offClick = new EventEmitter();

  // @Input() elRef2: ElementRef;



  // @HostListener('document:click', ['$event.path'])
  // public click(targetElementPath: Array<any>) {
  //   const elementRefInPath = targetElementPath.find(e => e === this.elRef.nativeElement);
  //   if (!elementRefInPath) {
  //     this.offClick.emit(1);
  //   }
  // }

  @HostListener('document:click', ['$event', '$event.target'])
  public onclick(event:MouseEvent, targetElement: HTMLElement): void{
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.offClick.emit(1);
    }
  }

}
