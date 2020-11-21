import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import mockItemList from '../mock-data/item-list';
import { IItem } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const itemList = mockItemList;
    const favoriteItemList: IItem[] = [];

    return { itemList, favoriteItemList };
  }
}
