import { Injectable } from '@angular/core';
import { IItem, IListRefinementConfig, IListSortingConfig } from '../models/interfaces';
import { TItemUid, TListSortingOrder } from '../models/types';
import { defaultSearchCriteriaTermKeys, defaultSortingConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class ListRefinementService {
  constructor() {}

  private refineByUids(list: IItem[], uids: TItemUid[]): IItem[] {
    return list.filter((it) => uids.includes(it.uid));
  }

  private refineBySearchConfig(list: IItem[], listRefinementConfig?: IListRefinementConfig): IItem[] {
    // Using regex instead of .includes to make search case-insensitive
    const searchRegex = new RegExp(listRefinementConfig?.filters?.searchTerm ?? '', 'i');
    // If criteria array empty all attributes in defaultSearchCriteriaTermKeys will be checked
    const criteriaTerms = listRefinementConfig?.filters?.searchCriteria?.length
      ? listRefinementConfig.filters.searchCriteria
      : defaultSearchCriteriaTermKeys;

    return list.filter((it) => {
      return criteriaTerms.some((criteriaTerm) => {
        return it[criteriaTerm].match(searchRegex);
      });
    });
  }

  private static applySortingOrder(comparison: number, order: TListSortingOrder): number {
    return order === 'asc' ? comparison : comparison * -1;
  }

  private static sortByPrice(itemA: string, itemB: string, sortingOrder: TListSortingOrder): number {
    const priceA: number = +itemA;
    const priceB: number = +itemB;

    const comparisonResult: number = priceA > priceB ? 1 : -1;

    return ListRefinementService.applySortingOrder(comparisonResult, sortingOrder);
  }

  private static sortByString(itemA: string, itemB: string, sortingOrder: TListSortingOrder): number {
    // TODO case insensitive search
    const comparisonResult: number = itemA > itemB ? 1 : -1;

    return ListRefinementService.applySortingOrder(comparisonResult, sortingOrder);
  }

  private sortList(list: IItem[], sortingConfig: IListSortingConfig | undefined): IItem[] {
    const sortingAttribute = sortingConfig?.keyName ?? defaultSortingConfig.keyName;
    const sortingOrder = sortingConfig?.order ?? defaultSortingConfig.order;

    const sortingFn = sortingAttribute === 'price' ? ListRefinementService.sortByPrice : ListRefinementService.sortByString;

    return list.sort((a, b) => {
      return sortingFn(a[sortingAttribute], b[sortingAttribute], sortingOrder);
    });
  }

  refineList(list: IItem[], listRefinementConfig?: IListRefinementConfig): IItem[] {
    if (!listRefinementConfig) {
      return list;
    }

    if (listRefinementConfig.filters?.uids !== undefined) {
      list = this.refineByUids(list, listRefinementConfig.filters.uids);
    }

    if (listRefinementConfig.filters?.searchTerm) {
      list = this.refineBySearchConfig(list, listRefinementConfig);
    }

    list = this.sortList(list, listRefinementConfig.sorting);

    return list;
  }
}
