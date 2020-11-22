import { TestBed } from '@angular/core/testing';

import { ListRefinementService } from './list-refinement.service';

describe('ListRefinementService', () => {
  let service: ListRefinementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRefinementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
