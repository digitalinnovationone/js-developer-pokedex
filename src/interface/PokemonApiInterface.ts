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
    types : any[];
    photo : string;
}
export interface DetailedPokemonPromise {
    id : number,
    name : string,
    types : [
        {type : {
            name : string
        }},
        {type : {
            name : string
        }}
    ],
    sprites : {
        other : {
            dream_world : {
                front_default : string
            }
        }
    }
}