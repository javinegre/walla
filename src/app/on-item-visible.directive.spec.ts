import { OnItemVisibleDirective } from './on-item-visible.directive';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {}

describe('OnItemVisibleDirective', () => {
  // tslint:disable-next-line
  let itemEl: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: ElementRef, useClass: MockElementRef }],
      }).compileComponents();
    })
  );

  it('should create an instance', () => {
    const directive = new OnItemVisibleDirective(itemEl);
    expect(directive).toBeTruthy();
  });
});
