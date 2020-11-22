import { TItemUid, TListSortingOrder, TSearchCriteriaTermKeys, TSearchCriteriaTermLabels } from './types';

export interface IItem {
  uid: TItemUid;
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}

export interface IFavoriteItem {
  id: number;
  uid: TItemUid;
}

export interface ISearchCriteriaOption {
  id: TSearchCriteriaTermKeys;
  label: TSearchCriteriaTermLabels;
  active: boolean;
}

export interface IListFilterConfig {
  uids?: TItemUid[];
  searchTerm?: string;
  searchCriteria?: TSearchCriteriaTermKeys[];
}

export interface IListSortingOption {
  id: TSearchCriteriaTermKeys;
  label: TSearchCriteriaTermLabels;
}

export interface IListSortingConfig {
  keyName: TSearchCriteriaTermKeys;
  order: TListSortingOrder;
}

export interface IListRefinementConfig {
  filters?: IListFilterConfig;
  sorting?: IListSortingConfig;
}
