import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import mockItemList from '../mock-data/item-list';
import { TFavoriteItemList, TItemUid } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const itemList = mockItemList;
    const favoriteItemList: TFavoriteItemList = [];

    return { itemList, favoriteItemList };
  }
}
