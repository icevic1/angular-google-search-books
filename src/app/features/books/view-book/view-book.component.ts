import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { EStore } from '@fireflysemantics/slice';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {Book} from '../../../model/index';
import {BookService} from '../../../core/book.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

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

  bookStore: EStore<Book> = this.bookService.bookStore;
  bookCollection: EStore<Book> = this.bookService.bookCollection;

  bookCollection$ = this.bookService.bookCollection.observe().pipe(untilDestroyed(this));

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService) {}

  ngOnInit() {
    this.book = this.route.snapshot.data.book;
    this.bookService.bookStore.clearActive();
    this.bookService.bookStore.addActive(this.book);
    this.isSelectedBookInFavorites$ = this.bookCollection$.pipe(map(() => this.bookCollection.contains(this.book)));
  }

  toggleCollection() {
    this.bookCollection.toggle(this.book);
    this.isSelectedBookInFavorites$.subscribe(v => console.log(v, this.book));
  }

  ngOnDestroy() {}

}
