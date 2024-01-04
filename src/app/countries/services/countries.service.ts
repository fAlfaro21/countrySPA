import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(
    private http: HttpClient
    ) { }

  searchCountryByAlfaCode(code: string): Observable<Country | null>{

    const url = `${ this.apiUrl }/alpha/${ code }`;
    
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null))
      );
  }

  searchCapital( term: string): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ term }`;

    //El pipe es un método con el que podemos especificar diferentes operadores de rxjs
    return this.http.get<Country[]>( url )
      .pipe(
        //Si hay un error, devuleve un observable que es un arreglo vacío
        catchError( () => of([]))
      );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]))
      );
  }

}
