
import {AfterViewInit, Directive, ElementRef, HostListener, OnChanges, Renderer2} from '@angular/core';

@Directive ({
  selector: '[autoScrollDown]'
})

export class ScrollDownChatDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}


  viewInitialised = false;

  // @HostListener('DOMNodeInserted') onClick(eventData: Event) {
  //
  //
  //   // console.log(tabs.scrollTop + ' - ' + (+tabs.scrollHeight - 850) + ' = ' + (+tabs.scrollTop - (+tabs.scrollHeight - 850)));
  //
  //
  //   if (this.viewInitialised) {
  //
  //     // if (scrollHeight > -50 && scrollHeight < 50) {
  //       setTimeout(() => {
  //         const tabs = this.elementRef.nativeElement;
  //         const scrollHeight = (+tabs.scrollTop - (+tabs.scrollHeight - 850));
  //
  //         console.log(tabs.scrollTop + ' - ' + (+tabs.scrollHeight - 850) + ' = ' + (+tabs.scrollTop - (+tabs.scrollHeight - 780)));
  //
  //
  //         this.scrollDown();
  //       }, 1000);
  //     // }
  //   }
  // }


  ngAfterViewInit() {
    this.viewInitialised = true;
    this.scrollDown();
  }

  scrollDown() {

    const tabs = this.elementRef.nativeElement;
    tabs.scrollTop = tabs.scrollHeight;

  }

}
