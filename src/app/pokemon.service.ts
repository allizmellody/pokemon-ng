import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pokemon } from './pokemon';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokebase (): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${BASE_URL}pokebase`,
      {params: new HttpParams()
        .set('page', '1')
        .set('limit', '10')
      }
    );
  }

  getCatched (): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${BASE_URL}pokebase/catched`);
  }

}
