import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_favorite_books';

@Injectable()
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { }

 /* public getLocalStorage(): any {
    return this.storage.get(STORAGE_KEY);
  }

  public storeOnLocalStorage(bookId: any): void {

    const currentStored = this.storage.get(STORAGE_KEY) || [];
    currentStored.push(bookId);

    const toStorage = [...new Set(currentStored)];

    this.storage.set(STORAGE_KEY, toStorage);
  }*/
}
