import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IItem, IListPaginationConfig, IListRefinementConfig } from '../models/interfaces';
import { ListRefinementService } from './list-refinement.service';
import { ListPaginationService } from './list-pagination.service';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {
  private itemListUrl = 'api/itemList';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private listRefinementService: ListRefinementService,
    private listPaginationService: ListPaginationService
  ) {}

  getItemList(listRefinementConfig?: IListRefinementConfig, listPaginationConfig?: IListPaginationConfig): Observable<IItem[]> {
    return this.http
      .get<IItem[]>(this.itemListUrl, this.httpOptions)
      .pipe(
        map((list) => {
          return this.listPaginationService.paginate(
            this.listRefinementService.refineList(list, listRefinementConfig),
            listPaginationConfig
          );
        })
      )
      .pipe(catchError(this.handleError<IItem[]>('getItemList', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
