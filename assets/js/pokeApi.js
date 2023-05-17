const totalPokemonCount = 1281
let currentPokeList = []

async function getPokemon(url) {
        try {
                let pokeModel = {}

                const data = await fetch(url)
                const result = await data.json()
                pokeModel.Name = result.name
                pokeModel.Number = result.id
                pokeModel.Sprite = result.sprites.other.dream_world.front_default
                pokeModel.Types = result.types.map((e) => { return e.type.name })
                pokeModel.Abilities = result.abilities.map((e) => { return e.ability.name })
                return pokeModel

        } catch (error) {
                console.error(error)
        }
}

async function construirLista() {
        try {
                const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=' + totalPokemonCount

                const responsePokemons = await fetch(pokemonUrl)
                const listPokemons = await responsePokemons.json()

                currentPokeList = await Promise.all(listPokemons.results.map((pokemon) => {
                        return getPokemon(pokemon.url)
                }))

        } catch (error) {
                console.error(error)
        }
}
