  import {Component, Input, ViewEncapsulation} from '@angular/core';
  import {Book} from '../../../model/index';

  @Component({
  selector: 'app-book-preview',
  template: `
    <div class="card text-center">
      <div class="card-body p-2">
        <a [routerLink]="[id, 'details']" class="text-decoration-none text-reset">
          <h5 class="card-title small"><strong>{{ title | trim : 40 }}</strong></h5>
          <img class="card-img" *ngIf="thumbnail" [src]="thumbnail" alt="Book card thumb" \>
          <h6 class="card-subtitle small mb-2 mt-2" *ngIf="subtitle">{{ subtitle | trim }}</h6>
          <p class="card-text small text-left" *ngIf="searchinfo"  [innerHTML]="searchinfo | safeHtml"></p>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./book-preview.component.scss'],
  /*encapsulation: ViewEncapsulation.None,*/
})
export class BookPreviewComponent {

  @Input() book: Book;

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get searchinfo(): string | boolean {
    if (!!this.book.searchInfo && this.book.searchInfo.hasOwnProperty('textSnippet')) {
      return this.book.searchInfo.textSnippet;
    }

    return false;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }

    return false;
  }

}
