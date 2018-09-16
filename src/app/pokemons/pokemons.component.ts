import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokebase();
  }

  getPokebase(): void {
    this.pokemonService.getPokebase()
      .subscribe(
        (data: Pokemon[]) => this.pokemons = data,
        error => console.log(error)
      );
  }

}
