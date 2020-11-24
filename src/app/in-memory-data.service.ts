import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import mockItemList from '../mock-data/item-list';
import { IFavoriteItem, IItem } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { itemList: IItem[]; favoriteItemList: IFavoriteItem[] } {
    const itemList = mockItemList;
    const favoriteItemList: IFavoriteItem[] = [];

    return { itemList, favoriteItemList };
  }

  genId(favoriteItemList: IFavoriteItem[]): number {
    return favoriteItemList.length > 0 ? Math.max(...favoriteItemList.map((item) => item.id)) + 1 : 1;
  }
}
