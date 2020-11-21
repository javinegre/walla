import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import mockItemList from '../mock-data/item-list';

 @Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const itemList = mockItemList;
    return { itemList };
  }
}
