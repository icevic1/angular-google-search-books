import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {Book} from "../model/index";
import {BookService} from "./book.service";

@Injectable({
  providedIn: 'root'
})
export class BookResolverService implements Resolve<Book> {
  constructor(
    private router: Router,
    private bookService: BookService
  ) {}
  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    let book = this.bookService.bookStore.findOneByID(id);

    console.log("resolver book:", book);

    if (!book) {
      try {
        book = await this.bookService.getById(id).toPromise();
        return book;
      } catch (err) {
        console.log("404", err);
        this.router.navigate(['/404']);
        return null;
      }
    }
    return book;
  }
}
