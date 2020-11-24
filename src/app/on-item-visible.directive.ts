import { Directive, AfterViewInit, EventEmitter, ElementRef, Output } from '@angular/core';

@Directive({
  selector: '[appOnItemVisible]',
})
export class OnItemVisibleDirective implements AfterViewInit {
  @Output() public itemVisible: EventEmitter<any> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor(private element: ElementRef) {}

  public ngAfterViewInit(): void {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(this.element.nativeElement as Element);
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.itemVisible.emit();
        this.intersectionObserver?.unobserve(this.element.nativeElement as Element);
        this.intersectionObserver?.disconnect();
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry): boolean {
    return entry.isIntersecting && entry.target === this.element.nativeElement;
  }
}
