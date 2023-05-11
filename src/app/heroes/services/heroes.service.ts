import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, pipe } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseURL: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseURL }/heroes`);
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${ this.baseURL }/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseURL }/heroes?q=${ query }&limit=6`);
  }

  addHero( hero:Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseURL }/heroes`, hero);
  }

  updateHero( hero:Hero ): Observable<Hero> {
    if( !hero.id ) throw Error('Hero id es requerido');

    return this.http.patch<Hero>(`${ this.baseURL }/heroes/${ hero.id }`, hero);
  }

  deleteHeroById( id: string ): Observable<boolean> {
    return this.http.delete<boolean>(`${ this.baseURL }/heroes/${ id }`)
      .pipe(
        catchError( err => of(false)),
        map( resp => true )
      );
  }

}
