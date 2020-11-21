import { Component, OnInit } from '@angular/core';
import { IItem } from '../../models/interface';
import { ItemListService } from '../item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  itemList: IItem[] | undefined;

  constructor(private itemListService: ItemListService) {}

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList(): void {
    this.itemListService.getItemList().subscribe((itemList) => (this.itemList = itemList));
  }
}
