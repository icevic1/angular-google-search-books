import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Book} from '../../../model/index';


@Component({
  selector: 'app-book-details',
  template: `
    <div class="container-fluid mt-3">
      <div *ngIf="book" class="card border-0">
        <div class="card-body p-2">
          <h5 class="card-title">
            <a (click)="toggleFavorite()" class="text-decoration-none pull-right">
              <i class="fa fa-fw"
                 [ngClass]="{
                    'fa-star-o': !inFavorites,
                    'fa-star text-warning': inFavorites
                 }"
              ></i>
            </a>
            <strong>{{ title }}</strong>
          </h5>
          <h6 *ngIf="subtitle" class="card-subtitle mb-2 mt-2">{{ subtitle}}</h6>
          <img class="card-img" *ngIf="thumbnail" [src]="thumbnail" alt="Book card thumb" \>
          <p class="card-text small text-left" *ngIf="searchinfo" [innerHTML]="searchinfo | safeHtml"></p>
          <p class="card-text small text-left" *ngIf="description" [innerHTML]="description | safeHtml"></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card .card-title > a {
      cursor: pointer;
    }

    .card img.card-img {
      height: 200px;
      width: auto;
    }
  `]
})
export class BookDetailsComponent {

  constructor() {}

  @Input() book: Book;
  @Input() inFavorites: boolean;
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  public toggleFavorite(): void {
    if (!this.inFavorites) {
      this.add.emit(this.book);
    } else {
      this.remove.emit(this.book);
    }
  }

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get searchinfo(): string | boolean {
    if (!!this.book.searchInfo && this.book.searchInfo.hasOwnProperty('textSnippet')) {
      return this.book.searchInfo.textSnippet;
    }

    return false;
  }

  get thumbnail() {
    return (
      this.book.volumeInfo.imageLinks &&
      this.book.volumeInfo.imageLinks.smallThumbnail &&
      this.book.volumeInfo.imageLinks.smallThumbnail.replace('http:', '')
    );
  }

}
