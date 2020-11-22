import { TestBed } from '@angular/core/testing';

import { ListPaginationService } from './list-pagination.service';

describe('ListPaginationService', () => {
  let service: ListPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
