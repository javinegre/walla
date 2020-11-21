import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListDialogComponent } from './favorite-list-dialog.component';

describe('FavoriteListDialogComponent', () => {
  let component: FavoriteListDialogComponent;
  let fixture: ComponentFixture<FavoriteListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
