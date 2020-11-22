import { TSearchCriteriaTermKeys } from '../models/types';
import { IListSortingConfig, IListSortingOption, ISearchCriteriaOption } from '../models/interfaces';

export const defaultSearchCriteriaTermKeys: TSearchCriteriaTermKeys[] = ['title', 'description', 'price', 'email'];

export const defaultSearchCriteriaConfig: ISearchCriteriaOption[] = [
  { id: 'title', label: 'Title', active: false },
  { id: 'description', label: 'Description', active: false },
  { id: 'price', label: 'Price', active: false },
  { id: 'email', label: 'Email', active: false },
];

export const defaultSortingOptionConfig: IListSortingOption[] = [
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'email', label: 'Email' },
];

export const defaultSortingConfig: IListSortingConfig = {
  keyName: 'title',
  order: 'asc',
};
