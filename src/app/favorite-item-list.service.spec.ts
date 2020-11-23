import { TestBed } from '@angular/core/testing';

import { FavoriteItemListService } from './favorite-item-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IFavoriteItem } from '../models/interfaces';

describe('FavoriteItemListService', () => {
  let service: FavoriteItemListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoriteItemListService],
    });
    service = TestBed.inject(FavoriteItemListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get FavoriteItem list', () => {
    it('should return an Observable<IItem[]>', () => {
      const dummyList: IFavoriteItem[] = [];

      service.getFavoriteItemList().subscribe((list) => {
        expect(list.length).toBe(dummyList.length);
      });

      const req = httpMock.expectOne(`api/favoriteItemList`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyList);
    });
  });

  describe('Add Favorite Item to list', () => {
    it('should add new item with Uid 123456 to favorite list', () => {
      const mockItemUid = '123456';

      service.addItem(mockItemUid).subscribe((newItem) => {
        // TODO review line below
        expect(newItem as any).toBe(mockItemUid);
      });

      const req = httpMock.expectOne(`api/favoriteItemList`);
      expect(req.request.method).toBe('POST');
      req.flush(mockItemUid);

      const reqGet = httpMock.expectOne(`api/favoriteItemList`);
      expect(reqGet.request.method).toBe('GET');
      reqGet.flush(mockItemUid);
    });
  });

  describe('Remove Favorite Item from list', () => {
    it('should remove item with Id 0 an Uid 987654 from favorite list', () => {
      const mockItem: IFavoriteItem = { id: 0, uid: '987654' };

      service.deleteItem(mockItem).subscribe((deletedItem) => {
        expect(deletedItem).toBe(mockItem);
      });

      const req = httpMock.expectOne(`api/favoriteItemList/${mockItem.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockItem);

      const reqGet = httpMock.expectOne(`api/favoriteItemList`);
      expect(reqGet.request.method).toBe('GET');
      reqGet.flush(mockItem);
    });
  });
});
