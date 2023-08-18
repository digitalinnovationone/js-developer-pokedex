var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class GetPokemons {
    action(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(offset, limit);
            const res = yield this.connectApi(url);
            const fullRes = yield this.generateDetailedPokemon(res);
            return fullRes;
        });
    }
    getUrl(offset, limit) {
        return `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    }
    generateDetailedPokemon(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const pokemonsUrl = json.results.map(pokemon => { return pokemon.url; });
            const detailedPokemon = yield this.getDetailedPokemonFromApi(pokemonsUrl);
            return detailedPokemon;
        });
    }
    getDetailedPokemonFromApi(urls) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield Promise.all(urls.map((url) => __awaiter(this, void 0, void 0, function* () {
                    const res = yield fetch(url).then(r => r.json());
                    const fullResponse = this.extractIndividualInfo(res);
                    return fullResponse;
                })));
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error();
            }
        });
    }
    extractIndividualInfo(obj) {
        const types = obj.types.map(type => type.type.name);
        return {
            number: obj.id,
            name: obj.name,
            type: types[0],
            types: types,
            photo: obj.sprites.other.dream_world.front_default,
        };
    }
    connectApi(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(url);
                const resJson = res.json();
                return resJson;
            }
            catch (error) {
                throw new Error("It wasn't possible connect and convert the pokemon list. " + error);
            }
        });
    }
}
