class Pokemon {
    constructor() {
        this.number = '';
        this.name = '';
        this.types = [];
        this.type = '';
        this.photo = '';
    }
}

const pokeApi = {
    convertPokeApiDetailToPokemon: function (pokeDetail) {
        const pokemon = new Pokemon();
        pokemon.number = pokeDetail.id;
        pokemon.name = pokeDetail.name;

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types;

        pokemon.types = types;
        pokemon.type = type;

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

        return pokemon;
    },

    getPokemonDetail: function (pokemon) {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(this.convertPokeApiDetailToPokemon);
    },

    getPokemons: function (offset = 0, limit = 5) {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokemon => this.getPokemonDetail(pokemon)))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails);
    }
};
