
import {ElementRef, HostListener, Directive, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[autosize]'
})

export class AutosizeDirective {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  @Input('autoresize') maxHeight: number;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.adjust();
  }

  adjust(): void {
    let ta = this.element.nativeElement, // .querySelector("input-itself")
      newHeight;
    let areaItself = ta.querySelector('.input-side').querySelector('.input-itself');

    if (ta) {
      areaItself.style.overflow = 'hidden';
      areaItself.style.height = 'auto';
      if (this.maxHeight) {
        newHeight = Math.min(areaItself.scrollHeight, this.maxHeight);
      } else {
        newHeight = areaItself.scrollHeight;
      }
      if (newHeight === this.maxHeight) {
        areaItself.style.overflow = 'visible';
      }
      ta.style.minHeight = (+newHeight + 10) + 'px';
      ta.style.height = (+newHeight + 10) + 'px';
      areaItself.style.height = newHeight + 'px';

    }
  }
}

