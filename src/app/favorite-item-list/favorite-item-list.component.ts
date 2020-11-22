import { Component, OnInit } from '@angular/core';
import { FavoriteItemListService } from '../favorite-item-list.service';
import { IFavoriteItem, IItem, IListFilterConfig, IListRefinementConfig } from '../../models/interfaces';
import { ItemListService } from '../item-list.service';

@Component({
  selector: 'app-favorite-item-list',
  templateUrl: './favorite-item-list.component.html',
  styleUrls: ['./favorite-item-list.component.scss'],
})
export class FavoriteItemListComponent implements OnInit {
  itemList: IItem[] | undefined;
  favoriteItemList: IFavoriteItem[] | undefined;

  searchCriteria: IListFilterConfig | undefined;

  constructor(private itemListService: ItemListService, private favoriteItemListService: FavoriteItemListService) {}

  ngOnInit(): void {
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
    this.favoriteItemListService.getFavoriteItemList().subscribe((favoriteItemList) => {
      this.favoriteItemList = favoriteItemList;
      this.getItemList();
    });
  }

  searchCriteriaChanged(searchCriteria: IListFilterConfig): void {
    this.searchCriteria = searchCriteria;
    this.getItemList();
  }
}
