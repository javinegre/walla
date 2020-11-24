import { TestBed } from '@angular/core/testing';

import { ListRefinementService } from './list-refinement.service';

import mockItemList from '../mock-data/item-list';
import { TItemUid } from '../models/types';
import { IListRefinementConfig } from '../models/interfaces';

describe('ListRefinementService', () => {
  let service: ListRefinementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRefinementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('List Refinement', () => {
    it('should not apply any refinement if empty config', () => {
      const refinedList = service.refineList(mockItemList);

      expect(refinedList).toEqual(mockItemList);
    });

    it('should filter items by uids and sort by title (default)', () => {
      const mockResultList = mockItemList.slice(0, 2);
      const uids: TItemUid[] = mockResultList.map((it) => it.uid);
      const refinementConfig: IListRefinementConfig = {
        filters: {
          uids,
        },
      };

      const refinedList = service.refineList(mockItemList, refinementConfig);

      expect(refinedList).toEqual(
        mockResultList.sort((a, b) => {
          return a.title > b.title ? 1 : -1;
        })
      );
    });

    it('should filter items by searchTerm "piso"', () => {
      const refinementConfig: IListRefinementConfig = {
        filters: {
          searchTerm: 'piso',
        },
      };

      const refinedList = service.refineList(mockItemList, refinementConfig);

      expect(refinedList.length).toBe(2);
    });

    it('should filter items by searchTerm "piso" and attribute "title"', () => {
      const refinementConfig: IListRefinementConfig = {
        filters: {
          searchTerm: 'piso',
          searchCriteria: ['title'],
        },
      };

      const refinedList = service.refineList(mockItemList, refinementConfig);

      expect(refinedList.length).toBe(1);
    });

    it('should sort items by email and ascending order', () => {
      const refinementConfig: IListRefinementConfig = {
        sorting: {
          keyName: 'email',
          order: 'asc',
        },
      };

      const refinedList = service.refineList(mockItemList, refinementConfig);

      expect(refinedList[0].email).toBe('analogue@wallapop.com');
    });

    it('should sort items by price and descending order', () => {
      const refinementConfig: IListRefinementConfig = {
        sorting: {
          keyName: 'price',
          order: 'desc',
        },
      };

      const refinedList = service.refineList(mockItemList, refinementConfig);

      expect(refinedList[0].price).toBe('288000');
    });
  });
});
