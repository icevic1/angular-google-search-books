import { Component} from '@angular/core';
import {BookService} from '../../core/book.service';

@Component({
  selector: 'app-home',
  template: `
    <nav class="navbar navbar-light justify-content-center d-flex" style="background-color:#93C5FD">
      <form class="form-inline">
        <input [value]="bookService.bookStore.query"
               (keyup)="search($event)"
               (keydown)="resetTimer()"
               autocomplete="off" class="form-control mr-sm-2" type="search" placeholder="Search Books" aria-label="Search" \>
      </form>
    </nav>

    <app-books-list
      [books]="bookService.books$ | async"
    ></app-books-list>
  `,
})
export class HomeComponent {

  typingTimer;                // timer identifier
  doneTypingInterval = 1000;  // time in ms, 2 second for example

  constructor(public bookService: BookService) {}

  search(event: any) {

    const query: string = event.target.value;
    clearTimeout(this.typingTimer);

    // 13: enter pressed; 8: backspace
    if (event.keyCode === 13 || (!query && event.keyCode === 8 )) {
      this.bookService.onSearch(query);
    } else {
      this.typingTimer = setTimeout(() => {
        this.bookService.onSearch(query);
      }, this.doneTypingInterval);
    }
  }

  resetTimer(): void {
    clearTimeout(this.typingTimer);
  }

}
