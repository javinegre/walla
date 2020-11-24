import { TestBed } from '@angular/core/testing';

import { ListPaginationService } from './list-pagination.service';

import mockItemList from '../mock-data/item-list';
import { IItem, IListPaginationConfig } from '../models/interfaces';

describe('ListPaginationService', () => {
  let service: ListPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Pagination Options', () => {
    it('should return 5 items by default', () => {
      const mockDefaultPaginationPageSize = 5;
      const mockPaginationOptions: IListPaginationConfig = {
        pageIndex: 0,
        pageSize: mockDefaultPaginationPageSize,
      };

      const paginatedList: IItem[] = service.paginate(mockItemList, mockPaginationOptions);

      expect(paginatedList.length).toBe(mockDefaultPaginationPageSize);
      expect(paginatedList).toEqual(mockItemList.slice(0, mockDefaultPaginationPageSize));
    });

    it('should return 2nd page with 4 items', () => {
      const mockPageIndex = 1;
      const mockPageSize = 4;
      const mockPaginationOptions: IListPaginationConfig = {
        pageIndex: mockPageIndex,
        pageSize: mockPageSize,
      };

      const paginatedList: IItem[] = service.paginate(mockItemList, mockPaginationOptions);

      expect(paginatedList.length).toBe(mockPageSize);
      expect(paginatedList).toEqual(mockItemList.slice(mockPageIndex * mockPageSize, mockPageIndex * mockPageSize + mockPageSize));
    });
  });
});
