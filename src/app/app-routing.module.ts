import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './features/home/home.component';
// import {BookDetailsComponent} from "./features/book-details/book-details.component";
import {BookResolverService} from './core/book-resolver.service';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {ViewBookComponent} from './features/books/view-book/view-book.component';
import {FavoritesComponent} from './features/favorites/favorites.component';

const routes: Routes = [
  {path:  '', pathMatch:  'full', redirectTo:  'books'},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'books',
    children: [
      { path: ':id/details',
        component: ViewBookComponent,
        resolve: { book: BookResolverService }
      },
      {path: '', component: HomeComponent},
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
