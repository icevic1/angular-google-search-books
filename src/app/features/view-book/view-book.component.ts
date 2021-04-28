import { Component, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { EStore } from '@fireflysemantics/slice';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {Book} from "../../model/index";
import {BookService} from "../../core/book.service";
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-view-book',
  template: `<app-book-details
                [book]="book"
                [inCollection]="isSelectedBookInCollection$ | async"
                (add)="toggleCollection()"
                (remove)="toggleCollection()"></app-book-details>`,
  styles: [`
    h1 { font-family: Lato; }
  `]
})
export class ViewBookComponent  {
  book: Book;
  isSelectedBookInCollection$: Observable<boolean>;

  bookStore: EStore<Book> = this.bookService.bookStore;
  bookCollection: EStore<Book> = this.bookService.bookCollection;

  activeBook$ =
    this.bookService.
    bookStore.
    observeActive().pipe(untilDestroyed(this));

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService) {}

  ngOnInit() {
    this.book = this.route.snapshot.data.book;
    this.bookService.bookStore.clearActive();
    this.bookService.bookStore.addActive(this.book);
    this.isSelectedBookInCollection$ = this.activeBook$.pipe(map(() => this.bookCollection.contains(this.book)));
  }

  toggleCollection() {
    this.bookCollection.toggle(this.book);
    this.isSelectedBookInCollection$.subscribe(v => console.log(v));
  }

  ngOnDestroy() {}

}
