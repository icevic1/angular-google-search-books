import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Book} from '../../model/index';

@Component({
  selector: 'app-books-list',
  template: `
    <div class="container-fluid mt-3">
      <div class="card-columns">
        <app-book-preview
          *ngFor="let book of books"
          [book]="book"></app-book-preview>
      </div>
    </div>
  `,
  styleUrls: ['./books-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BooksListComponent {
  @Input()
  public books: Book[];

}

