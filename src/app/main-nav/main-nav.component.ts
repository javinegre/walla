import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteListDialogComponent } from '../favorite-list-dialog/favorite-list-dialog.component';
import { IFavoriteItem } from '../../models/interfaces';
import { FavoriteItemListService } from '../favorite-item-list.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  favoriteItemList: IFavoriteItem[] | undefined;

  constructor(private favoriteItemListService: FavoriteItemListService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFavoriteItemList();
  }

  getFavoriteItemList(): void {
    this.favoriteItemListService.getFavoriteItemList().subscribe((favoriteItemList) => (this.favoriteItemList = favoriteItemList));
  }

  getFavoriteListCount(): number {
    return this.favoriteItemList?.length ?? 0;
  }

  openFavoriteListDialog(): void {
    const favoriteListDialogRef = this.dialog.open(FavoriteListDialogComponent);

    favoriteListDialogRef.afterClosed().subscribe();
  }
}
