import {AfterViewInit, Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'img[urlCorrector]',
  host: {
    '(load)' : 'loaded()',
    '[src]':'src'
  }
})

export class ProfilePictureUrlCorrectorDirective  {
  @Input() src: string;
  @Input() urlCorrector: string;


  loaded() {
    if (this.urlCorrector.length && !this.urlCorrector.startsWith('http') && !this.urlCorrector.startsWith('/')) {
      this.src = '/assets/images/profile_pictures/' + this.urlCorrector;
    }
  }

}
