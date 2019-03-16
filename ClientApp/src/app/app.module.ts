import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {PagesRoutingModule} from './app-routing.module';
import {MyOwnCustomMaterialModule} from './sources/shared/shared-ng-material.module';
import {JwtModule} from '@auth0/angular-jwt';
import {GetTokenService, tokenGetter} from './sources/shared/getToken.service';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RefInterceptor} from './sources/shared/ref.interceptor';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GlobalStoreEffects} from './sources/global-store/global-store.effects';
import {globalStoresReducer} from './sources/global-store/globalstores.reducers';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TabDirective} from './sources/directives/tab.directive';
import {MatIconModule, MatTooltipModule, MatButton, MatButtonModule} from '@angular/material';
import {AutosizeDirective} from './sources/directives/autosize.directive';
import {ScrollDownChatDirective} from './sources/directives/scroll-down-chat.directive';
import {MouseOverMessage} from './sources/directives/mouse-over-message';
import {EmojiPositionDirective} from './sources/directives/emoji-position.directive';
import {BubbleClassDirective} from './sources/directives/bubble-class.directive';
import {YoutubeSanitizerPipe} from './sources/pipes/youtube-sanitizer.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faYoutube } from '@fortawesome/free-brands-svg-icons';
import {faPollH, faImages, faSmile} from '@fortawesome/free-solid-svg-icons';
import { AddArticleComponent } from './add-article/add-article.component';
import {QUILL_CONFIG, QuillConfigInterface, QuillModule} from 'ngx-quill-wrapper';
import {OutclickDirective} from './sources/directives/csole-dropdown-menu-directive';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {UpdateUserInfoService} from './sources/services/updateUserInfo.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import {DefaultImageDirective} from './sources/directives/default-image.directive';
import {GetCostumerService} from './sources/services/getCostumer.service';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { UpdateCostumerService } from './sources/services/updateCostumer.service';
import {ProfilePictureUrlCorrectorDirective} from './sources/directives/profile-picture-url-corrector.directive';


library.add(faYoutube, faSmile, faImages, faPollH);
const DEFAULT_QUILL_CONFIG: QuillConfigInterface = {
  theme: 'snow',
  modules: {
    toolbar: true
  },
  placeholder: 'Article Content'
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,

    TabDirective,
    AutosizeDirective,
    ScrollDownChatDirective,
    MouseOverMessage,
    EmojiPositionDirective,
    BubbleClassDirective,
    YoutubeSanitizerPipe,
    AddArticleComponent,
    OutclickDirective,
    ProfilePageComponent,
    ErrorPageComponent,
    DefaultImageDirective,
    ProfilePictureUrlCorrectorDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,

    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:44312'],
        blacklistedRoutes: ['https://localhost:44312/api/auth/login', 'https://localhost:44312/api/auth/login'],
        skipWhenExpired: true
      }
    }),

    StoreModule.forRoot({globalStores: globalStoresReducer}),
    EffectsModule.forRoot([GlobalStoreEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatIconModule,
    FlexLayoutModule,
    FontAwesomeModule,
    QuillModule,
    NgxMyDatePickerModule.forRoot(),


    MatTooltipModule,
  ],
  providers: [
   GetTokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefInterceptor,
      multi: true
    },

    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG
    },
    UpdateUserInfoService,
    GetCostumerService,
    UpdateCostumerService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
