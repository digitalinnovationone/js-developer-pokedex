export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface DetailedPokemon {
    number : number;
    name : string;
    type : string;
    types : [];
    photo : string;
}