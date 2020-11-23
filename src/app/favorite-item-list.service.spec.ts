import { TestBed } from '@angular/core/testing';

import { FavoriteItemListService } from './favorite-item-list.service';
import { HttpClientModule } from '@angular/common/http';

describe('FavoriteItemListService', () => {
  let service: FavoriteItemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(FavoriteItemListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
