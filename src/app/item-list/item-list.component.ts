import { Component, OnInit } from '@angular/core';
import { IFavoriteItem, IItem } from '../../models/interfaces';
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

  constructor(private itemListService: ItemListService, private favoriteItemListService: FavoriteItemListService) {}

  ngOnInit(): void {
    this.getItemList();
    this.getFavoriteItemList();
  }

  getItemList(): void {
    this.itemListService.getItemList().subscribe((itemList) => (this.itemList = itemList));
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
}
