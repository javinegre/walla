import { Injectable } from '@angular/core';
import { IItem, IListPaginationConfig } from '../models/interfaces';
import { defaultPaginationPageSize } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class ListPaginationService {
  constructor() {}

  paginate(list: IItem[], listPaginationConfig?: IListPaginationConfig): IItem[] {
    if (!listPaginationConfig) {
      return list;
    }

    const pageIndex: number = listPaginationConfig.pageIndex ?? 0;
    const pageSize: number = listPaginationConfig.pageSize ?? defaultPaginationPageSize;

    return list.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  }
}
