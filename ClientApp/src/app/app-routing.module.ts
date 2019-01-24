import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {AuthGuard} from './sources/guards/auth.guard';
import {LogedInGuard} from './sources/guards/loged-in.guard';
import {AddArticleComponent} from './add-article/add-article.component';

const pagesRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard], },
  { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
  { path: 'add-article', component: AddArticleComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [LogedInGuard]},
  { path: '**', redirectTo: '', canActivate: [AuthGuard]}

];

@NgModule({
  imports: [
    RouterModule.forRoot(pagesRoutes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, LogedInGuard],
})
export class PagesRoutingModule {}
