import {AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[mouse-over-message]'
})

export class MouseOverMessage implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon-place'), 'visibility', 'hidden');

    const bubbleHeight = this.elementRef.nativeElement.querySelector('.bubble').offsetHeight;
    const replyIcon = this.elementRef.nativeElement.querySelector('.reply-icon-place');


    if (bubbleHeight > 40) {
      this.renderer.addClass(replyIcon, 'reply-icon');
    } else {
      this.renderer.addClass(replyIcon, 'reply-icon-single-line');
    }


    // height for message icon panel
    if (this.elementRef.nativeElement.querySelector('.reply-icon')) {
      const messageHeight = this.elementRef.nativeElement.offsetHeight;
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon'), 'height', messageHeight + 'px');
    }


    // Reverse Owners Icons
    if (this.elementRef.nativeElement.querySelector('.owners-reply') && bubbleHeight < 40) {
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.owners-reply'), 'flex-direction', 'row-reverse');
    }
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    const bubbleHeight = this.elementRef.nativeElement.querySelector('.bubble').offsetHeight;
    const replyIcon = this.elementRef.nativeElement.querySelector('.reply-icon');
    const replyIconSingleLine = this.elementRef.nativeElement.querySelector('.reply-icon-single-line');
    if (this.elementRef.nativeElement.querySelector('.reply-icon')) {
      if (!this.elementRef.nativeElement.querySelector('.owners-reply')) {
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon'), 'height', (+bubbleHeight + 13) + 'px');
      } else {
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon'), 'height', (+bubbleHeight + 3) + 'px');
      }

      if (bubbleHeight < 40 ) {
        this.renderer.addClass(replyIcon, 'reply-icon-single-line');
        this.renderer.removeClass(replyIcon, 'reply-icon');
      }
    } else if (this.elementRef.nativeElement.querySelector('.reply-icon-single-line')) {
      if (bubbleHeight > 40) {
        this.renderer.addClass(replyIconSingleLine, 'reply-icon');
        this.renderer.removeClass(replyIconSingleLine, 'reply-icon-single-line');
      }
    }
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    if (this.elementRef.nativeElement.querySelector('.reply-icon')) {
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon'), 'visibility', 'visible');
    } else if (this.elementRef.nativeElement.querySelector('.reply-icon-single-line')) {
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon-single-line'), 'visibility', 'visible');
    }
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    if (this.elementRef.nativeElement.querySelector('.reply-icon')) {
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon'), 'visibility', 'hidden');
    } else if (this.elementRef.nativeElement.querySelector('.reply-icon-single-line')) {
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.reply-icon-single-line'), 'visibility', 'hidden');
    }
  }

}
