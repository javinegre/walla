import { Directive, AfterViewInit, EventEmitter, ElementRef, Output } from '@angular/core';

@Directive({
  selector: '[appOnItemVisible]',
})
export class OnItemVisibleDirective implements AfterViewInit {
  @Output() public onItemVisible: EventEmitter<any> = new EventEmitter();

  private _intersectionObserver?: IntersectionObserver;

  constructor(private _element: ElementRef) {}

  public ngAfterViewInit() {
    this._intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this._intersectionObserver.observe(<Element>this._element.nativeElement);
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.onItemVisible.emit();
        this._intersectionObserver?.unobserve(<Element>this._element.nativeElement);
        this._intersectionObserver?.disconnect();
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return entry.isIntersecting && entry.target === this._element.nativeElement;
  }
}
