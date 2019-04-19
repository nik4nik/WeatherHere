import { Inject, Injectable } from '@angular/core';//
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';//

// key that is used to access the data in local storage
const STORAGE_KEY = 'local_cites';

@Injectable()
export class LocalStorageService {
     anotherList = [];
     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
     public storeOnLocalStorage(city: string, forecast: string): void {
          // get array of cities from the local storage
          const currentList = this.storage.get(STORAGE_KEY) || [];
          // push new city to array
          currentList.push({
              city: city,
              forecast: forecast 
          });
          // insert updated array to the local storage
          this.storage.set(STORAGE_KEY, currentList);
          //console.log(this.storage.get(STORAGE_KEY) || 'Local storage is empty');
     }

     public removeFromLocalStorage(idx): void {
          // get array of cities from the local storage
          const currentList = this.storage.get(STORAGE_KEY) || [];
          // push new city to array
          currentList.splice(idx, 1);
          // insert updated array to the local storage
          this.storage.set(STORAGE_KEY, currentList);
          //console.log(this.storage.get(STORAGE_KEY) || 'Local storage is empty');
     }

	 public clearOnLocalStorage(): void {
		 this.storage.remove(STORAGE_KEY);
	 }
	 
	 public getAll() {
		return this.storage.get(STORAGE_KEY);
	 }
}