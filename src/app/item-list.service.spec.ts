import { TestBed } from '@angular/core/testing';

import { ItemListService } from './item-list.service';
import { HttpClientModule } from '@angular/common/http';

describe('ItemListService', () => {
  let service: ItemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ItemListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
