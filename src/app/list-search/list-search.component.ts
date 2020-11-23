import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IListFilterConfig } from '../../models/interfaces';
import { defaultSearchCriteriaConfig } from '../config';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.scss'],
})
export class ListSearchComponent implements OnInit, OnDestroy {
  @Input() viewMode: 'default' | 'simple' = 'default';
  @Input() searchTerm: string | undefined;
  @Output() onSearchCriteriaChange = new EventEmitter<IListFilterConfig>();

  private searchTermSubject = new Subject<Event>();
  private searchTermSubscription: Subscription | undefined;

  searchCriteria = defaultSearchCriteriaConfig;

  isFilterVisible = false;

  constructor() {}

  ngOnInit(): void {
    this.searchTermSubscription = this.searchTermSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.onSearchCriteriaChange.emit(this.getFilterConfig());
    });
  }

  searchTermChanged($event: Event): void {
    this.searchTermSubject.next($event);
  }

  clearSearchTerm(): void {
    this.searchTerm = undefined;
    this.onSearchCriteriaChange.emit(this.getFilterConfig());
  }

  criterionChanged(): void {
    this.onSearchCriteriaChange.emit(this.getFilterConfig());
  }

  getFilterConfig(): IListFilterConfig {
    return {
      searchTerm: this.searchTerm,
      searchCriteria: this.searchCriteria.filter((criterion) => criterion.active).map((criterion) => criterion.id),
    };
  }

  getPlaceholderText(): string {
    return 'Search by title, description, price, ...';
  }

  hasFilterOptions(): boolean {
    return this.viewMode !== 'simple';
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  ngOnDestroy() {
    this.searchTermSubscription?.unsubscribe();
  }
}
