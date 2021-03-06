import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { EStore } from '@fireflysemantics/slice';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {Book} from '../../../model/index';
import {BookService} from '../../../core/book.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {LocalStorageService} from '../../../core/local-storage.service';

@Component({
  selector: 'app-view-book',
  template: `<app-book-details
                [book]="book"
                [inFavorites]="isSelectedBookInFavorites$ | async"
                (add)="toggleCollection()"
                (remove)="toggleCollection()">
              </app-book-details>`,
})
export class ViewBookComponent implements OnInit, OnDestroy {
  book: Book;
  isSelectedBookInFavorites$: Observable<boolean>;

  // bookStore: EStore<Book> = this.bookService.bookStore;
  bookCollection: EStore<Book> = this.bookService.bookCollection;

  bookCollection$ = this.bookService.bookCollection.observe().pipe(untilDestroyed(this));

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.book = this.route.snapshot.data.book;
    this.bookService.bookStore.clearActive();
    this.bookService.bookStore.addActive(this.book);
    this.isSelectedBookInFavorites$ = this.bookCollection$.pipe(map(() => {
      // return true if opened book are in favorite list already
      return this.bookCollection.contains(this.book);
    }));

    this.bookCollection$.subscribe((e) => {
      // keep in local chache each change in our favorite list
      this.localStorageService.setLocalStorage(e);
    });
  }

  toggleCollection() {
    this.bookCollection.toggle(this.book);
    // this.isSelectedBookInFavorites$.subscribe(v => console.log(v, this.book));
  }

  ngOnDestroy() {}

}
