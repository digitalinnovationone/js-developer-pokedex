class Pokemon{
    id;
    name;
    types;
    img;
    specie;
    height;
    weight;
    abilities;
    eggGroup
}


function createPokeModel(pokemonDeta){
    const modPokemon=new Pokemon
    modPokemon.id=pokemonDeta.id
    modPokemon.name=pokemonDeta.name
    modPokemon.types=pokemonDeta.types.map((element)=>element.type.name)
    modPokemon.img=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDeta.id}.png`
    modPokemon.height=pokemonDeta.height
    modPokemon.weight=pokemonDeta.weight
    modPokemon.abilities=pokemonDeta.abilities.map((element)=>element.ability.name)
    
    modPokemon.specie=pokemonDeta.species.name

    


    return modPokemon

}
    
