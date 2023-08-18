var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetPokemons } from "./util/GetPokemons.js";
const pagController = {
    pokemonList: document.getElementById('pokemonList'),
    loadMoreButton: document.getElementById('loadMoreButton'),
    action: () => {
        pagController.load();
        pagController.loadMoreButton
            .addEventListener('click', pagController.loadMorePokemon);
    },
    load: () => __awaiter(void 0, void 0, void 0, function* () {
        pagController.construtor(yield getSomePokemons(pagSettings.offset, pagSettings.limit));
    }),
    construtor: (pkm) => {
        pkm.forEach(pokemon => {
            pagController.pokemonList.innerHTML += `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>`;
        });
    },
    loadMorePokemon: () => {
        var _a;
        pagSettings.incrementDefaultParams();
        if (pagSettings.canGetPokemons()) {
            pagController.load();
        }
        else {
            (_a = pagController.loadMoreButton.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(pagController.loadMoreButton);
        }
    }
};
const pagSettings = {
    offset: 0,
    limit: 20,
    incrementDefaultParams: () => {
        if (pagSettings.canGetPokemons()) {
            pagSettings.offset += pagSettings.limit;
        }
    },
    canGetPokemons: () => {
        if (pagSettings.offset === 480) {
            pagSettings.limit = 15;
        }
        return pagSettings.offset < 495;
    }
};
const getPokemons = new GetPokemons();
const getSomePokemons = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getPokemons.action(offset, limit);
});
pagController.action();
