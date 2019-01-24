import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[emoji-position]'
})
export class EmojiPositionDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}


  viewInitialised = false;

  @HostListener('DOMNodeInserted') onClick(eventData: Event) {

    if (this.viewInitialised) {

      const bubble = this.elementRef.nativeElement;

      if (bubble.querySelector('.emoji-on-message-position-other')) {
        this.otherEmojiPosition();

      }
      if (bubble.querySelector('.emoji-on-message-position-owner')) {
        this.ownerEmojiPosition();

      }
    }

  }




  ngAfterViewInit() {


    this.viewInitialised = true;
    const bubble = this.elementRef.nativeElement;

    if (bubble.querySelector('.emoji-on-message-position-other')) {
      const emojis = bubble.querySelector('.emoji-on-message-position-other');
      const emoji = bubble.querySelector('.emoji-on-message-position-other').querySelector('.emoji-on-message-position-other');

        this.otherEmojiPosition();
    }
    if (bubble.querySelector('.emoji-on-message-position-owner')) {
      const emojis = bubble.querySelector('.emoji-on-message-position-owner');
      const emoji = bubble.querySelector('.emoji-on-message-position-owner').querySelector('.emoji-on-message-position-owner');

      this.ownerEmojiPosition();
      // emojis.addEventListener('click',
      //   console.log('aaaa'),
      //   this.ownerEmojiPosition()
      // );
    }
  }

  otherEmojiPosition() {
    const bubble = this.elementRef.nativeElement;
    const emojis = bubble.querySelector('.emoji-on-message-position-other');
    const emoji = bubble.querySelector('.emoji-on-message-position-other').querySelector('.emoji-on-message-position-other');
    if (emoji.offsetWidth < bubble.offsetWidth - 15) {
      this.renderer.setStyle(emojis,
        'right',
        (+bubble.offsetWidth + 10) + 'px');
      this.renderer.setStyle(emoji,
        'right',
        (+bubble.offsetWidth - +bubble.offsetWidth + 10) + 'px');
      this.renderer.removeStyle(emojis, 'left');
      this.renderer.removeStyle(emoji, 'left');
    } else {
      this.renderer.setStyle(emojis,
        'left',
        '10px');
      this.renderer.setStyle(emoji,
        'left',
        '10px');

      this.renderer.removeStyle(emojis, 'right');
      this.renderer.removeStyle(emoji, 'right');

    }
  }


  ownerEmojiPosition() {
    const bubble = this.elementRef.nativeElement;
    const emojis = bubble.querySelector('.emoji-on-message-position-owner');
    const emoji = bubble.querySelector('.emoji-on-message-position-owner').querySelector('.emoji-on-message-position-owner');
    if (emoji.offsetWidth > bubble.offsetWidth - 10) {
      // this.renderer.setStyle(emojis,
      //   'left',
      //   '-' + (+emoji.offsetWidth - bubble.offsetWidth + 10) + 'px');

      // console.log('Yeees');

      this.renderer.setStyle(emojis,
        'right',
        '10px');
      this.renderer.setStyle(emoji,
        'right',
        '10px');

      // this.renderer.removeStyle(emojis, 'right');
      // this.renderer.removeStyle(emoji, 'right');
  } else {
      this.renderer.removeStyle(emojis, 'left');
      this.renderer.removeStyle(emoji, 'left');
    }
  }


}
