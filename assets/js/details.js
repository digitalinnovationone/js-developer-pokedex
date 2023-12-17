

function hasUrlParams(){
    const params = new URLSearchParams(window.location.search);

    if(params.size < 1 || params.get('pokemon') == ''){
        return window.location.href = "/";
    }

    loadPokemonDetails(params.get('pokemon'))
}

async function loadPokemonDetails(pokemonName){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = await response.json();

        //detalhes
        const name = data.name;
        const type = data.types[0].type.name;
        const image = data.sprites.other.dream_world.front_default;

        document.querySelector('.content').classList.add(type)
        document.querySelector('.pokemon_title').textContent = capitalizarPrimeiraLetra(name)
        document.querySelector('.pokemon_photo').src = image
        document.querySelector('.pokemon_photo').alt = capitalizarPrimeiraLetra(name)
        document.querySelector('.pokemon_types').innerHTML = `${data.types.map((pokemon) => `<span class="pokemon_type ${pokemon.type.name}">${pokemon.type.name}</span>`).join('')}`
        document.querySelector('.about_abilities').innerHTML += `${data.abilities.map((pokemon) => `<td>${capitalizarPrimeiraLetra(pokemon.ability.name)}</td>`).join('')}`
        document.querySelector('.about_height').innerHTML += `<td>${data.height / 10}m</td>`
        document.querySelector('.about_weight').innerHTML += `<td>${data.weight / 10}kg</td>`
        document.querySelector('.about_egg_cycle').innerHTML += `<td>${capitalizarPrimeiraLetra(type)}</td>`

        console.log(data)

    }catch(error){
        console.log("Erro ao obter detalhes do pokemon: ", error);
    }
}

function changeContent(index) {
    // Oculta todos os conteúdos
    for (let i = 1; i <= 4; i++) {
        document.getElementById('content' + i).style.display = 'none';
    }

    // Remove a classe 'active' de todos os links
    const links = document.getElementsByClassName('nav-link');
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    // Exibe o conteúdo do link clicado
    document.getElementById('content' + (index + 1)).style.display = 'block';

    // Adiciona a classe 'active' ao link clicado
    links[index].classList.add('active');
}

function capitalizarPrimeiraLetra(str) {
    // Verifica se a string não é vazia
    if (str.length === 0) {
        return str;
    }

    // Capitaliza o primeiro caractere e concatena o restante da string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

hasUrlParams()
changeContent(0)