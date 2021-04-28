import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import {Book} from "../../model/index";


@Component({
  selector: 'app-book-details',
  template: `
    <!--<mat-card *ngIf="book">
      <mat-card-title-group>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
        <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </mat-card-title-group>
      <mat-card-content>
        <p [innerHtml]="description"></p>
      </mat-card-content>
      <mat-card-footer class="footer">
        <bc-book-authors [book]="book"></bc-book-authors>
        <button mat-raised-button color="primary" (click)='goBack()'>
        Back
        </button>
      </mat-card-footer>
      <mat-card-actions align="start">
        <button mat-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(book)">
        Remove Book from Collection
        </button>

        <button mat-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(book)">
        Add Book to Collection
        </button>
      </mat-card-actions>
    </mat-card>-->
    <div *ngIf="book" class="card">
      <div class="card-body p-2">
        <h5 class="card-title"><strong>{{ title }}</strong></h5>
        <h6 *ngIf="subtitle" class="card-subtitle mb-2 mt-2">{{ subtitle}}</h6>
        <img class="card-img" *ngIf="thumbnail" [src]="thumbnail" alt="Book card thumb" \>
        <p class="card-text small text-left" *ngIf="searchinfo"  [innerHTML]="searchinfo | safeHtml"></p>
      </div>
    </div>
  `,
  styles: [`
  .card img.card-img {
      height: 200px;
      width: auto;
    }
  `]
})
export class BookDetailsComponent {

  constructor(private location: Location) {}

  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() book: Book;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  /**
   * Tip: Utilize getters to keep templates clean
   */
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

  get thumbnail() {
    return (
      this.book.volumeInfo.imageLinks &&
      this.book.volumeInfo.imageLinks.smallThumbnail &&
      this.book.volumeInfo.imageLinks.smallThumbnail.replace('http:', '')
    );
  }

  goBack() {
    this.location.back();
  }
}
