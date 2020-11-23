import { OnItemVisibleDirective } from './on-item-visible.directive';
import { async, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {}

describe('OnItemVisibleDirective', () => {
  let itemEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        //more providers
        { provide: ElementRef, useClass: MockElementRef },
      ],
    }).compileComponents();
  }));

  it('should create an instance', () => {
    const directive = new OnItemVisibleDirective(itemEl);
    expect(directive).toBeTruthy();
  });
});
