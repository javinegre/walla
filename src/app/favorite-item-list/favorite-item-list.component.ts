import { Component, OnInit } from '@angular/core';
import { FavoriteItemListService } from '../favorite-item-list.service';
import { IFavoriteItem, IItem, IListRefinementConfig } from '../../models/interfaces';
import { ItemListService } from '../item-list.service';

@Component({
  selector: 'app-favorite-item-list',
  templateUrl: './favorite-item-list.component.html',
  styleUrls: ['./favorite-item-list.component.scss'],
})
export class FavoriteItemListComponent implements OnInit {
  itemList: IItem[] | undefined;
  favoriteItemList: IFavoriteItem[] | undefined;

  constructor(private itemListService: ItemListService, private favoriteItemListService: FavoriteItemListService) {}

  ngOnInit(): void {
    this.getFavoriteItemList();
  }

  getItemList(): void {
    const filterConfig: IListRefinementConfig = {
      filters: { uids: this.favoriteItemList?.map((it) => it.uid) ?? [] },
    };
    this.itemListService.getItemList(filterConfig).subscribe((itemList) => (this.itemList = itemList));
  }

  getFavoriteItemList(): void {
    this.favoriteItemListService.getFavoriteItemList().subscribe((favoriteItemList) => {
      this.favoriteItemList = favoriteItemList;
      this.getItemList();
    });
  }
}
