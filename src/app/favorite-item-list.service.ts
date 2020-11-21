import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IItem } from '../models/interfaces';
import { catchError } from 'rxjs/operators';
import { TFavoriteItemList } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class FavoriteItemListService {
  private favoriteItemListUrl = 'api/favoriteItemList';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getFavoriteItemList(): Observable<TFavoriteItemList> {
    return this.http
      .get<TFavoriteItemList>(this.favoriteItemListUrl)
      .pipe(catchError(this.handleError<TFavoriteItemList>('getFavoriteItemList', [])));
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
