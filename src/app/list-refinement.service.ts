import { Injectable } from '@angular/core';
import { IItem, IListRefinementConfig } from '../models/interfaces';
import { TItemUid } from '../models/types';
import { defaultSearchCriteriaTermKeys } from './config';

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

    return list;
  }
}
