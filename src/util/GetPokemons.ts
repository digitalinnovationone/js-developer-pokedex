import { DetailedPokemon, PokemonList, DetailedPokemonPromise } from "../interface/PokemonApiInterface.js";

export class GetPokemons {
    public async action (offset : number, limit : number) : Promise<DetailedPokemon[]> {
        const url = this.getUrl(offset, limit);
        const res = await this.connectApi(url);
        const fullRes = await this.generateDetailedPokemon(res);
        return fullRes;
    }

    private getUrl(offset : number, limit : number) : string {
        return `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    }

    private async generateDetailedPokemon (json : PokemonList) : Promise<DetailedPokemon[]> {
        const pokemonsUrl = json.results.map(pokemon => {return pokemon.url});
        const detailedPokemon = await this.getDetailedPokemonFromApi(pokemonsUrl);
        return detailedPokemon;
    }

    private async getDetailedPokemonFromApi (urls : string[]) : Promise<DetailedPokemon[]> {
        let result : DetailedPokemon[];
        try {
            result = await Promise.all(urls.map(async (url) => {
                const res = await fetch(url).then(r => r.json());
                const fullResponse = this.extractIndividualInfo(res);
                return fullResponse;
            }));
            return result;
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    }

    private extractIndividualInfo (obj : DetailedPokemonPromise) : DetailedPokemon {
        const types = obj.types.map(type => type.type.name);
        return {
            number : obj.id,
            name : obj.name,
            type : types[0],
            types : types,
            photo : obj.sprites.other.dream_world.front_default,
        };
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