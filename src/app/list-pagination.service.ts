import { Injectable } from '@angular/core';
import { IItem, IListPaginationConfig } from '../models/interfaces';
import { defaultPaginationPageSize } from './config';

@Injectable({
  providedIn: 'root',
})
export class ListPaginationService {
  constructor() {}

  paginate(list: IItem[], listPaginationConfig?: IListPaginationConfig): IItem[] {
    if (!listPaginationConfig) {
      return list;
    }

    const start: number = listPaginationConfig.start ?? 0;
    const pageSize: number = listPaginationConfig.pageSize ?? defaultPaginationPageSize;

    return list.slice(start, start + pageSize);
  }
}
