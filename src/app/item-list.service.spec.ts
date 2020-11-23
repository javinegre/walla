import { TestBed } from '@angular/core/testing';

import { ItemListService } from './item-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import mockItemList from '../mock-data/item-list';

describe('ItemListService', () => {
  let service: ItemListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemListService],
    });
    service = TestBed.inject(ItemListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get Item list', () => {
    it('should return an Observable<IItem[]>', () => {
      const dummyList = mockItemList;

      service.getItemList().subscribe((list) => {
        expect(list.length).toBe(mockItemList.length);
      });

      const req = httpMock.expectOne(`api/itemList`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyList);
    });
  });
});
