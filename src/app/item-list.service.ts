import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { IItem, IListRefinementConfig } from '../models/interfaces';
import { TItemUid } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {
  private itemListUrl = 'api/itemList';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  refineByUids(list: IItem[], uids: TItemUid[]): IItem[] {
    return list.filter((it) => uids.includes(it.uid));
  }

  refineList(list: IItem[], listRefinementConfig?: IListRefinementConfig): IItem[] {
    if (!listRefinementConfig) {
      return list;
    }

    if (listRefinementConfig.filters?.uids !== undefined) {
      list = this.refineByUids(list, listRefinementConfig.filters.uids);
    }

    return list;
  }

  getItemList(listRefinementConfig?: IListRefinementConfig): Observable<IItem[]> {
    return this.http
      .get<IItem[]>(this.itemListUrl, this.httpOptions)
      .pipe(
        map((list) => {
          return this.refineList(list, listRefinementConfig);
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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
