import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseURL: string = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {

    return this.http.get<User>(`${  this.baseURL }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'jlhfiuUHNUna.adinaidsn1.12419jai') ),
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {
    if( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>( `${ this.baseURL }/users/1` )
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ), // Need to return a boolean so if user = {name:"eslavi"...} !user = false, !!user = true
        catchError( err => of(false) )
      );
  }

}

