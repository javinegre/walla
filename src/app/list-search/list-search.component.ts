import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IListFilterConfig } from '../../models/interfaces';
import { defaultSearchCriteriaConfig } from '../app-config';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.scss'],
})
export class ListSearchComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string | undefined;
  @Input() viewMode: 'default' | 'simple' = 'default';
  @Input() placeholderText: string | undefined;
  @Output() searchCriteriaChange = new EventEmitter<IListFilterConfig>();

  private searchTermSubject = new Subject<Event>();
  private searchTermSubscription: Subscription | undefined;

  searchCriteria = defaultSearchCriteriaConfig;

  isFilterVisible = false;

  constructor() {}

  ngOnInit(): void {
    this.searchTermSubscription = this.searchTermSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.searchCriteriaChange.emit(this.getFilterConfig());
    });
  }

  searchTermChanged($event: Event): void {
    this.searchTermSubject.next($event);
  }

  clearSearchTerm(): void {
    this.searchTerm = undefined;
    this.searchCriteriaChange.emit(this.getFilterConfig());
  }

  criterionChanged(): void {
    this.searchCriteriaChange.emit(this.getFilterConfig());
  }

  getFilterConfig(): IListFilterConfig {
    return {
      searchTerm: this.searchTerm,
      searchCriteria: this.searchCriteria.filter((criterion) => criterion.active).map((criterion) => criterion.id),
    };
  }

  getPlaceholderText(): string {
    return this.placeholderText ?? 'Search by title, description, price, ...';
  }

  hasFilterOptions(): boolean {
    return this.viewMode !== 'simple';
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  ngOnDestroy(): void {
    this.searchTermSubscription?.unsubscribe();
  }
}
