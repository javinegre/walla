import { Component, OnInit } from '@angular/core';
import { FavoriteItemListService } from '../favorite-item-list.service';
import { IFavoriteItem, IItem, IListFilterConfig, IListRefinementConfig } from '../../models/interfaces';
import { ItemListService } from '../item-list.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-item-list',
  templateUrl: './favorite-item-list.component.html',
  styleUrls: ['./favorite-item-list.component.scss'],
})
export class FavoriteItemListComponent implements OnInit {
  itemList: IItem[] | undefined;
  favoriteItemList: IFavoriteItem[] | undefined;
  removedItems: IFavoriteItem[] | undefined;

  searchCriteria: IListFilterConfig | undefined;

  constructor(private itemListService: ItemListService, private favoriteItemListService: FavoriteItemListService) {}

  ngOnInit(): void {
    this.removedItems = [];

    this.getFavoriteItemList();
  }

  getItemList(): void {
    const filterConfig: IListRefinementConfig = {
      filters: {
        ...this.searchCriteria,
        uids: this.favoriteItemList?.map((it) => it.uid) ?? [],
        searchCriteria: ['title', 'description'], // Only searching under these attributes in favorite list
      },
    };
    this.itemListService.getItemList(filterConfig).subscribe((itemList) => (this.itemList = itemList));
  }

  getFavoriteItemList(): void {
    this.favoriteItemListService
      .getFavoriteItemList()
      .pipe(first())
      .subscribe((favoriteItemList) => {
        this.favoriteItemList = favoriteItemList;
        this.getItemList();
      });
  }

  addToFavoriteList(item: IItem): void {
    this.favoriteItemListService.addItem(item.uid).subscribe();

    const itemToAdd: IFavoriteItem | undefined = this.removedItems?.find((it) => it.uid === item.uid);
    if (itemToAdd) {
      this.favoriteItemList?.push(itemToAdd);
    }
  }

  deleteFromFavoriteList(item: IItem): void {
    const favoriteItem = this.favoriteItemList?.find((it) => it.uid === item.uid);
    if (favoriteItem) {
      this.favoriteItemListService.deleteItem(favoriteItem).subscribe();

      this.favoriteItemList = this.favoriteItemList?.filter((it) => it.uid !== item.uid);
      this.removedItems?.push(favoriteItem);
    }
  }

  isFavoriteItem(item: IItem): boolean {
    return this.favoriteItemList?.find((it) => it.uid === item.uid) !== undefined;
  }

  searchCriteriaChanged(searchCriteria: IListFilterConfig): void {
    this.searchCriteria = searchCriteria;
    this.getItemList();
  }
}
