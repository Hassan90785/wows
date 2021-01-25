import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';



@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  private palyerUrl = 'https://api.worldofwarships.com/wows/account/info/?application_id=423feed867f0628c7a11a20a524097f7';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    // console.log(of(HEROES.find(hero => hero.name === term)))

    // return of(HEROES.find(hero => hero.name === term));
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getPlayer(account_id: string): Observable<Hero> {
    const url = `${this.palyerUrl}&account_id=${account_id}`;

    // let items = [];
    // this.http.get(this.url).toPromise().then(data => {
    //   console.log(data)
    //   this.log(data)
    //   for (let key in data)
    //     this.items.push(JSON.stringify(data[key]));
    //   // result = JSON.stringify(data[key])
      
    //   // for (let key in data)
    //   //   if (data.hasOwnProperty(key)):
    //   //     this.items.push(JSON.stringify(data[key]));
    // });
    // this.log(items)
    // return items;
    // // .toPromise().then(data => {
      
      
      // for (let key in data)
      //   if (data.hasOwnProperty(key)):
      //     this.items.push(JSON.stringify(data[key]));
    // });
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched player account_id=${account_id}`)),
      catchError(this.handleError<Hero>(`getPlayer account_id=${account_id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
