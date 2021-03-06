import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { BooksListComponent } from './features/books/books-list/books-list.component';
import { BookDetailsComponent } from './features/books/book-details/book-details.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BookPreviewComponent } from './features/books/books-list/book-preview/book-preview.component';
import { TrimmerPipe } from './shared/trimmer.pipe';
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ViewBookComponent } from './features/books/view-book/view-book.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import {StorageServiceModule} from 'ngx-webstorage-service';
import {LocalStorageService} from './core/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksListComponent,
    BookDetailsComponent,
    BookPreviewComponent,
    TrimmerPipe,
    SafeHtmlPipe,
    NotFoundComponent,
    ViewBookComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StorageServiceModule,
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
