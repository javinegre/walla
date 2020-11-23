import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteItemListComponent } from './favorite-item-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('FavoriteItemListComponent', () => {
  let component: FavoriteItemListComponent;
  let fixture: ComponentFixture<FavoriteItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FavoriteItemListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
