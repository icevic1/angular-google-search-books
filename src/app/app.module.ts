import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { BooksListComponent } from './features/books-list/books-list.component';
import { BookDetailsComponent } from './features/book-details/book-details.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BookPreviewComponent } from './features/books-list/book-preview/book-preview.component';
import { TreemerPipe } from './shared/treemer.pipe';
import { TrimmerPipe } from './shared/trimmer.pipe';
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ViewBookComponent } from './features/view-book/view-book.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
