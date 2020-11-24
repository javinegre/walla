import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IFavoriteItem } from '../models/interfaces';
import { catchError } from 'rxjs/operators';
import { TItemUid } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class FavoriteItemListService implements OnDestroy {
  private favoriteItemListUrl = 'api/favoriteItemList';

  private listSubject: Subject<IFavoriteItem[]> | undefined;
  private listRequest: Observable<IFavoriteItem[]> | undefined;
  private listSubscription: Subscription | undefined;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.listSubject = new Subject<IFavoriteItem[]>();
  }

  getFavoriteItemList(): Observable<IFavoriteItem[]> {
    // https://stackoverflow.com/questions/40249629/how-do-i-force-a-refresh-on-an-observable-service-in-angular2
    this.listRequest = this.http
      .get<IFavoriteItem[]>(this.favoriteItemListUrl)
      .pipe(catchError(this.handleError<IFavoriteItem[]>('getFavoriteItemList', [])));

    this.listRequest.subscribe(
      (result) => this.listSubject?.next(result),
      (err) => this.listSubject?.error(err)
    );

    return (this.listSubject as Subject<IFavoriteItem[]>).asObservable();
  }

  addItem(itemUid: TItemUid): Observable<IFavoriteItem> {
    return this.http
      .post<IFavoriteItem>(this.favoriteItemListUrl, { uid: itemUid }, this.httpOptions)
      .pipe(
        tap((_) => {
          this.getFavoriteItemList();
        })
      )
      .pipe(catchError(this.handleError<IFavoriteItem>('addItem')));
  }

  deleteItem(favoriteItem: IFavoriteItem): Observable<IFavoriteItem> {
    const url = `${this.favoriteItemListUrl}/${favoriteItem.id}`;

    return this.http
      .delete<IFavoriteItem>(url, this.httpOptions)
      .pipe(
        tap((_) => {
          this.getFavoriteItemList();
        })
      )
      .pipe(catchError(this.handleError<IFavoriteItem>('deleteItem')));
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

  ngOnDestroy(): void {
    this.listSubscription?.unsubscribe();
  }
}
