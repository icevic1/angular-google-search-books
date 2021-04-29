import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {Book} from '../../model/index';
import {BookService} from '../../core/book.service';
import {tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-favorites',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-books-list
      [books]="books$ | async"
    ></app-books-list>
  `,
})
export class FavoritesComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
  ) {
    this.books$ = this.bookService.bookCollection.observe().pipe(
      untilDestroyed(this),
      tap(async (/*query: any*/) => {})
    );
  }

  async ngOnInit() {

    /*this.bookService.bookCollection.reset();

    for (const bookId of this.localStorageService.getLocalStorage()) {

      const book = await this.bookService.getById(bookId).toPromise();
      console.log("for id:", bookId, this.bookService.bookCollection.contains(book));
      this.bookService.bookStore.clearActive();
      this.bookService.bookStore.addActive(book);
      // this.isSelectedBookInFavorites$ = this.bookCollection$.pipe(map(() => this.bookCollection.contains(book)));

      this.bookService.toggleCollection(await this.bookService.getById(bookId).toPromise());
    }*/
  }

  ngOnDestroy() {}
}
