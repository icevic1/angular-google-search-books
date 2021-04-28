import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map, tap, filter, debounceTime, distinctUntilChanged} from "rxjs/operators";
import { Book } from "../model";
import { EStore } from "@fireflysemantics/slice";


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private API_PATH = "https://www.googleapis.com/books/v1/volumes";

  public bookStore: EStore<Book> = new EStore();
  public bookCollection: EStore<Book> = new EStore();
  public books$: Observable<Book[]> = this.bookStore.observe();
  public collection$: Observable<Book[]> = this.bookCollection.observe();

  constructor(private http: HttpClient) {
    this.bookStore.observeQuery().pipe(filter(Boolean),
      debounceTime(200),
      distinctUntilChanged(),
      tap(async (query: string) => {
        const bo: Observable<Book[]> = this.searchAPI(query);
        const books: Book[] = await bo.toPromise();
        this.bookStore.reset();
        this.bookStore.postA(books);
        console.log("post", books);
      })
    ).subscribe();
  }

  onSearch(query: string) {
    console.log("onsearch", query);
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

  toggleCollection(book: Book) {
    this.bookCollection.toggle(book);
  }
}
