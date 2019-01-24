import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { QuillComponent, QuillDirective,
  QuillConfigInterface, QuillModulesInterface } from 'ngx-quill-wrapper';

import * as Quill from 'quill';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleComponent implements AfterViewInit {

  // constructor() { }
  //
  // ngOnInit() {
  // }

  openedNodeTemplate1 = '<p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p><br></p><p><br></p><h2 class="ql-indent-1"><strong style="color: red;" class="ql-font-monospace">Onslaught</strong></h2><p><span class="ql-font-monospace">As the minutes went by the Blaugranes found their rhythm of play, and Riqui Puig stung Falcon’s fingertips before Ballou had the best chance of the first half. Defensively superb, and with a notable performance from keeper Iñaki Peña, Barça didn’t surrender against a second half onslaught. The draw, against the team in third place, meant that the blaugranes ended the year with seven points from their final three games.</span></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/KzARx0EuDgc?showinfo=0"></iframe><p><br></p><h2><br></h2><h2 class="ql-indent-1"><strong style="color: rgb(0, 71, 178);" class="ql-font-monospace">MATCH DETAILS</strong></h2><p><span class="ql-font-monospace">Hércules CF, 0</span></p><p><span class="ql-font-monospace">FC Barcelona B, 0</span></p><p><br></p><p><strong class="ql-font-monospace">Hércules FC</strong><span class="ql-font-monospace">:&nbsp;Ismael Falcon, Juanjo Nieto, Nani, Pol Bueso, Samuel, Fran Miranda (Candela, min 68), Chechu (c) (Juli, min 79), Diego Benito, Pol Roigé, Carlos Martínez, José Fran (Emaná, min 56).</span></p><p><strong class="ql-font-monospace">FC Barcelona B</strong><span class="ql-font-monospace">:&nbsp;Iñaki Peña, Wague, Araujo, J. Cuenca, Guillem, O.Busquets (c), Carles Pérez, Riqui Puig (Jandro, min 90), Mujica (Marqués, min 71), Collado, Ballou (McGuane, min 78).</span></p><p><br></p>';
  openedNodeTemplate: SafeHtml;
  show = true;

  type = 'component';

  disabled = false;

  public config: QuillConfigInterface = {
    theme: 'snow',
    readOnly: false
  };

  public modules: QuillModulesInterface = {};


  private toolbar: any = [
    // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //
    // ['align', { align: 'center' },{ align: 'right' }{ align: 'justify' }],
    //
    // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }, { 'header': [1, 2, 3, 4, 5, 6, false] }],
    //
    // ['blockquote', 'code-block'],
    //
    // // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // // [{ 'direction': 'rtl' }],                         // text direction
    // //
    // // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //
    // // [{ 'align': [] }],
    //
    // // ['clean'],                                         // remove formatting button
    //
    // ['link', 'image', 'video']

    [
      'bold', 'italic', 'underline', 'strike',
    ],
    [
      'align', { align: 'center' }, { align: 'right' }, { align: 'justify' }
    ],
    [
      { 'color': [] }, { 'background': [] },
    ],
    [
      { 'font': [] }, { 'header': [1, 2, 3, 4, 5, 6, false] },
    ],
    [
      'blockquote',
    ],
    [
      { 'list': 'ordered'}, { 'list': 'bullet' },
      { 'indent': '+1' },
    ],
    [
      'link', 'image', 'video'
    ]
  ];

  @ViewChild(QuillComponent) componentRef?: QuillComponent;
  @ViewChild(QuillDirective) directiveRef?: QuillDirective;

  icons = Quill.import('ui/icons');

  constructor( private sanitizer: DomSanitizer ) {

    this.openedNodeTemplate = sanitizer.bypassSecurityTrustHtml(this.openedNodeTemplate1) ;

    this.icons['bold'] =  '<i style="font-size: 20px;" class="material-icons"> format_bold</i>';
    this.icons['italic'] =  '<i style="font-size: 20px;" class="material-icons"> format_italic</i>';
    this.icons['underline'] =  '<i style="font-size: 20px;" class="material-icons"> format_underline</i>';
    this.icons['strike'] =  '<i style="font-size: 20px;" class="material-icons"> format_strikethrough</i>';
    this.icons['align'][''] =  '<i  style="font-size: 20px;" class="material-icons"> format_align_left </i>';
    this.icons['align']['center'] =  '<i style="font-size: 20px;" class="material-icons"> format_align_center </i>';
    this.icons['align']['right'] =  '<i style="font-size: 20px;" class="material-icons"> format_align_right </i>';
    this.icons['align']['justify'] =  '<i style="font-size: 20px;" class="material-icons"> format_align_justify </i>';
    this.icons['color'] =  '<i style="font-size: 20px;" class="material-icons"> format_color_text </i>';
    this.icons['background'] =  '<i style="font-size: 20px;" class="material-icons"> format_color_fill </i>';
    this.icons['link'] =  '<i style="font-size: 20px;" class="material-icons"> link </i>';
    this.icons['blockquote'] =  '<i style="font-size: 20px;" class="material-icons"> format_quote </i>';
    this.icons['list']['ordered'] =  '<i style="font-size: 20px;" class="material-icons">format_list_numbered </i>';
    this.icons['list']['bullet'] =  '<i style="font-size: 20px;" class="material-icons">format_list_bulleted </i>';
    this.icons['blockquote'] =  '<i style="font-size: 20px;" class="material-icons"> format_quote </i>';
    this.icons['image'] =  '<i style="font-size: 20px;" class="material-icons"> insert_photo </i>';
    this.icons['video'] =  '<i style="font-size: 20px;" class="material-icons"> video_library </i>';
    this.icons['blockquote'] =  '<i style="font-size: 20px;" class="material-icons"> format_quote </i>';
    this.icons['indent']['+1'] =  '<i style="font-size: 20px;" class="material-icons"> format_indent_increase </i>';


    // this.icons['bold'] = require('<div style="color: black;text-align:center; margin: 0px 5px 0px 5px;"> ' +
    //   '<fa-icon [icon]="[\'fas\', \'images\']"></fa-icon> </div>');

    this.modules = { 'modules/focus': FocusEvent };

    this.config.modules = { toolbar: this.toolbar, focus: { focusClass: 'focused' } };
  }

  ngAfterViewInit(): void {
    // To get the Quill instance:

    // this.directiveRef.quill();
    // this.componentRef.directiveRef.quill();
  }

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleTheme(): void {
    this.config.theme = (this.config.theme === 'snow') ? 'bubble' : 'snow';
  }

  public toggleToolbar(): void {
    this.config.modules = (this.config.modules.toolbar) ?
      { toolbar: false } : { toolbar: this.toolbar };
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleReadonly(): void {
    this.config.readOnly = (this.config.readOnly === true) ? false : true;
  }

  public clearEditorContent(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.clear();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.clear();
    }
  }

  public onEditorBlur(event: any): void {
    console.log('Editor blur:', event);
  }

  public onEditorFocus(event: any): void {
    console.log('Editor focus:', event);
  }

  public onEditorCreate(event: any): void {
    console.log('Editor create:', event);
  }

  public onValueChange(value: string): void {
    console.log('Value change:', value);
  }

  public onContentChange(event: any): void {
    console.log('Content change:', event);
  }

  public onSelectionChange(event: any): void {
    console.log('Selection change:', event);
  }

}
