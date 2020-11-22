import { TSearchCriteriaTermKeys } from '../models/types';
import { ISearchCriteriaOption } from '../models/interfaces';

export const defaultSearchCriteriaTermKeys: TSearchCriteriaTermKeys[] = ['title', 'description', 'price', 'email'];

export const defaultSearchCriteriaConfig: ISearchCriteriaOption[] = [
  { id: 'title', label: 'Title', active: false },
  { id: 'description', label: 'Description', active: false },
  { id: 'price', label: 'Price', active: false },
  { id: 'email', label: 'Email', active: false },
];
