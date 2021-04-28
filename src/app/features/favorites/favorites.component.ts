import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
export class FavoritesComponent implements OnDestroy {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books$ = this.bookService.bookCollection.observe().pipe(
      untilDestroyed(this),
      tap(async (query: any) => {

        console.log("tap:", query);
        // const bo: Observable<Book[]> = this.searchAPI(query);
        // const books: Book[] = await bo.toPromise();
        // this.bookStore.reset();
        // this.bookStore.postA(books);
      })
    );
  }
  ngOnDestroy() {}
}
