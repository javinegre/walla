import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { defaultSortingConfig, defaultSortingOptionConfig } from '../app-config';
import { IListFilterConfig, IListSortingConfig } from '../../models/interfaces';

@Component({
  selector: 'app-sorting-options',
  templateUrl: './sorting-options.component.html',
  styleUrls: ['./sorting-options.component.scss'],
})
export class SortingOptionsComponent implements OnInit {
  @Output() onSortingChange = new EventEmitter<IListSortingConfig>();

  defaultSortingConfig = defaultSortingConfig;
  sortingOptionConfig = defaultSortingOptionConfig;

  selectedCriteria = this.defaultSortingConfig.keyName;
  selectedOrder = this.defaultSortingConfig.order;

  constructor() {}

  ngOnInit(): void {}

  changeSortingOrder(): void {
    this.selectedOrder = this.selectedOrder === 'asc' ? 'desc' : 'asc';
    this.emitSortingChange();
  }

  getSortingConfig(): IListSortingConfig {
    return {
      keyName: this.selectedCriteria,
      order: this.selectedOrder,
    };
  }

  getTooltipText(): string {
    return `Change to ${this.selectedOrder === 'asc' ? 'descending' : 'ascending'} order`;
  }

  emitSortingChange(): void {
    this.onSortingChange.emit(this.getSortingConfig());
  }
}
