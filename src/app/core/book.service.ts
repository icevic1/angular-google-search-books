import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map, tap, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { Book } from '../model';
import { EStore } from '@fireflysemantics/slice';
import {LocalStorageService} from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  public bookStore: EStore<Book> = new EStore();
  public bookCollection: EStore<Book> = new EStore();
  public books$: Observable<Book[]> = this.bookStore.observe();
  // public collection$: Observable<Book[]> = this.bookCollection.observe();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {

    this.bookStore.observeQuery().pipe(
      filter(Boolean),
      debounceTime(200),
      distinctUntilChanged(),
      tap(async (query: string) => {
        // observe when input query changed and save search keywords to local cache
        this.localStorageService.setSearchLocalStorage(query);

        // request search by query keyword through googleapis REST Service
        const bo: Observable<Book[]> = this.searchAPI(query);
        const books: Book[] = await bo.toPromise();

        // reset current book storage
        this.bookStore.reset();

        // populate a empty book storage with response from googleapis
        this.bookStore.postA(books);
      })
    ).subscribe();

    // Restore collection from cache to bookStore and favorite collection,
    // It tacked once when service created
    const localCollection = this.localStorageService.getLocalStorage() || [];
    this.bookStore.postA(localCollection);
    this.bookCollection.postA(localCollection);
  }

  onSearch(query: string) {
    this.bookStore.query = query;
  }

  public searchAPI(query: string): Observable<Book[]> {
    return this.http.get<{ items: Book[] }>(`${this.API_PATH}?q=${query}`).pipe(
      map(books => books.items || [])
    );
  }

  getById(volumeId: string): Observable<Book> {
    return this.http.get<Book>(`${this.API_PATH}/${volumeId}`);
  }

  /*toggleCollection(book: Book) {
    this.bookCollection.toggle(book);
  }*/
}
