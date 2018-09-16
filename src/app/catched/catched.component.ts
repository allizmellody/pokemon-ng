import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { CatchedPokemon } from '../catchedPokemon';

@Component({
  selector: 'app-catched',
  templateUrl: './catched.component.html',
  styleUrls: ['./catched.component.css']
})
export class CatchedComponent implements OnInit {

  catchedPokemons: CatchedPokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getCatched();
  }

  getCatched(): void {
    this.pokemonService.getCatched()
      .subscribe(
        (data: CatchedPokemon[]) => this.catchedPokemons = data,
        error => console.log(error)
      );
  }

}
