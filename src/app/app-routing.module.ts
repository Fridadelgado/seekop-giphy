import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FavoriteGifsComponent } from './components/favorite-gifs/favorite-gifs.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {path :'favorites', component: FavoriteGifsComponent},
  {path :'search', component: SearchBarComponent},
 {
   path: '**', pathMatch: 'full',
   component: PageNotFoundComponent
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
