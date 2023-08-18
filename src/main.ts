import { DetailedPokemon } from "./interface/PokemonApiInterface.js";
import { GetPokemons } from "./util/GetPokemons.js";

const pagController = {
    pokemonList : <HTMLElement> document.getElementById('pokemonList'),
    loadMoreButton : <HTMLElement> document.getElementById('loadMoreButton'),
    action : () => {
        pagController.load();
        pagController.loadMoreButton
            .addEventListener('click', pagController.loadMorePokemon);
    },
    load : async () => {
        pagController.construtor(
            await getSomePokemons(pagSettings.offset, pagSettings.limit)
        );
    },
    construtor : (pkm : DetailedPokemon[]) => {
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
                </li>`
        });
    },
    loadMorePokemon : () => {
        pagSettings.incrementDefaultParams();
        if(pagSettings.canGetPokemons()) {
            pagController.load();
        } else {
            pagController.loadMoreButton.parentNode?.removeChild(pagController.loadMoreButton);
        }
    }
}

const pagSettings = {
    offset : 0,
    limit : 20,
    incrementDefaultParams : () : void => {
        if(pagSettings.canGetPokemons()) {
            pagSettings.offset += pagSettings.limit;
        }
    },
    canGetPokemons : () : boolean => {
        if(pagSettings.offset === 480) {
            pagSettings.limit = 15;
        }
        return pagSettings.offset < 495;
    }
}
const getPokemons = new GetPokemons();
const getSomePokemons = async (offset : number, limit : number) => {
    return await getPokemons.action(offset, limit);
};

pagController.action();