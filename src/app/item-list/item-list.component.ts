import { Component, OnInit } from '@angular/core';
import {
  IFavoriteItem,
  IItem,
  IListFilterConfig,
  IListPaginationConfig,
  IListRefinementConfig,
  IListSortingConfig,
} from '../../models/interfaces';
import { ItemListService } from '../item-list.service';
import { FavoriteItemListService } from '../favorite-item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  itemList: IItem[] | undefined;
  favoriteItemList: IFavoriteItem[] | undefined;

  searchCriteria: IListFilterConfig | undefined;
  sortingCriteria: IListSortingConfig | undefined;
  currentPage: number = 0;

  constructor(private itemListService: ItemListService, private favoriteItemListService: FavoriteItemListService) {}

  ngOnInit(): void {
    this.getItemList();
    this.getFavoriteItemList();
  }

  getItemList(): void {
    const refinementConfig: IListRefinementConfig = {
      filters: this.searchCriteria,
      sorting: this.sortingCriteria,
    };
    const paginationConfig: IListPaginationConfig = {
      pageIndex: this.currentPage,
    };

    this.itemListService.getItemList(refinementConfig, paginationConfig).subscribe((itemList) => {
      this.itemList = this.currentPage === 0 ? itemList : [...(this.itemList ?? []), ...itemList];
    });
  }

  searchCriteriaChanged(searchCriteria: IListFilterConfig): void {
    this.searchCriteria = searchCriteria;
    this.currentPage = 0;
    this.getItemList();
  }

  sortingCriteriaChanged(sortingCriteria: IListSortingConfig): void {
    this.sortingCriteria = sortingCriteria;
    this.currentPage = 0;
    this.getItemList();
  }

  getFavoriteItemList(): void {
    this.favoriteItemListService.getFavoriteItemList().subscribe((favoriteItemList) => (this.favoriteItemList = favoriteItemList));
  }

  addToFavoriteList(item: IItem): void {
    this.favoriteItemListService.addItem(item.uid).subscribe();
  }

  deleteFromFavoriteList(item: IItem): void {
    const favoriteItem = this.favoriteItemList?.find((it) => it.uid === item.uid);
    if (favoriteItem) {
      this.favoriteItemListService.deleteItem(favoriteItem).subscribe();
    }
  }

  isFavoriteItem(item: IItem): boolean {
    return this.favoriteItemList?.find((it) => it.uid === item.uid) !== undefined;
  }

  loadNextPage(): void {
    this.currentPage++;
    this.getItemList();
  }
}
