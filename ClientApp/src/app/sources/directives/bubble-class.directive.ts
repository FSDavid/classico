
import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Directive({
  selector: '[bubble-class-directive]'
})
export class BubbleClassDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // console.log(this.elementRef.nativeElement.querySelectorAll('.bubble-class-place'));
    const messages = this.elementRef.nativeElement.querySelectorAll('.bubble-class-place');

    // for (i = 0; i < messages.length; i++) {
    //   if (messages[i].
    // }

  }

}
