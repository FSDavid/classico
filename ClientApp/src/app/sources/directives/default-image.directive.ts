import {Directive, HostBinding, Input} from '@angular/core';

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
    // this.className = 'image-loaded';
  }
}
