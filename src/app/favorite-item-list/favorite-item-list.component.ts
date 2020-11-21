import { Component, OnInit } from '@angular/core';
import { FavoriteItemListService } from '../favorite-item-list.service';
import { IFavoriteItem } from '../../models/interfaces';

@Component({
  selector: 'app-favorite-item-list',
  templateUrl: './favorite-item-list.component.html',
  styleUrls: ['./favorite-item-list.component.scss'],
})
export class FavoriteItemListComponent implements OnInit {
  favoriteItemList: IFavoriteItem[] | undefined;

  constructor(private favoriteItemListService: FavoriteItemListService) {}

  ngOnInit(): void {
    this.getFavoriteItemList();
  }

  getFavoriteItemList(): void {
    this.favoriteItemListService.getFavoriteItemList().subscribe((favoriteItemList) => (this.favoriteItemList = favoriteItemList));
  }
}
