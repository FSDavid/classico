import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
  }
})

export class DefaultImageDirective {
  @Input() src: string;
  @Input() default: string;
  // @HostBinding('class') className;


  updateUrl() {
    this.src = this.default;
  }
  load(){
    console.log()
    // this.className = 'image-loaded';
  }
}
