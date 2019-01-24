import {AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[tabDirective]'
})
export class TabDirective implements OnInit, AfterViewInit/*, AfterViewChecked*/ {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const tabs = this.elementRef.nativeElement.querySelector('.tabs');
    const selector = tabs.querySelector('.selector');
    const activeItem = tabs.querySelector('.active');

    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.tabs').querySelector('.selector'),
      'left',
      activeItem.offsetLeft + 'px');

    this.renderer.setStyle(selector,
      'width',
      getComputedStyle(activeItem).width !== 'auto' ? getComputedStyle(activeItem).width : activeItem.offsetWidth + 'px');

    tabs.addEventListener('click',
      this.onClick.bind(this)
    );
  }

  ngOnInit() {}

  @HostListener('window:resize', ['$event']) onResize(event) {
    const tabs = this.elementRef.nativeElement.querySelector('.tabs');
    const selector = this.elementRef.nativeElement.querySelector('.tabs').querySelector('.selector');
    const activeItem = tabs.querySelector('.active');

    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.tabs').querySelector('.selector'),
      'left',
      activeItem.offsetLeft + 'px');

    this.renderer.setStyle(selector,
      'width',
      getComputedStyle(activeItem).width !== 'auto' ? getComputedStyle(activeItem).width : activeItem.offsetWidth + 'px');
  }


  onClick(event) {
    const tabs = this.elementRef.nativeElement.querySelector('.tabs');
    const selector = this.elementRef.nativeElement.querySelector('.tabs').querySelector('.selector');

    if (event.target.className === 'active') {

    } else {
      this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.tabs').querySelector('a.active'), 'active');
      this.renderer.addClass(event.target, 'active');

      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.tabs').querySelector('.selector'),
        'left',
        event.target.offsetLeft + 'px');
      this.renderer.setStyle(selector,
        'width',
        getComputedStyle(event.target).width);
    }

  }


}
