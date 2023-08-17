import { DetailedPokemon, PokemonList } from "../interface/PokemonApiInterface.js";

export class GetPokemons {
    public async action (offset : number, limit : number) : Promise<PokemonList> {
        const url = this.getUrl(offset, limit);
        const res = await this.connectApi(url);
        return res;
    }

    private getUrl(offset : number, limit : number) : string {
        return `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    }

    private generateDetailedPokemon (json : PokemonList) {
        let pokemonArray = [];
        const pokemonsUrl = json.results.map(pokemon => {return pokemon.url});
        // const detailedPokemon 

    }

    private getDetailedPokemon (url : string[]) {

    }

    private async connectApi (url : string) : Promise<PokemonList> {
        try {
            const res = await fetch(url);
            const resJson = res.json();
            return resJson as Promise<PokemonList>;
        } catch (error) {
            throw new Error("It wasn't possible connect and convert the pokemon list. " + error);
        }
    }
}