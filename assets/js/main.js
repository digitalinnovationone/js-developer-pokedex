const listapokemon = document.getElementById('lista');
const nextbtn = document.getElementById('next');
const prevbtn = document.getElementById('prev');
const limit = 10;
let offset = 0;

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
        ).join('');

        listapokemon.innerHTML = newHtml;

        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openPokemonDetail(pokemons[index]);
            });
        });
    });
}

loadPokemon(offset, limit);

nextbtn.addEventListener('click', () => {
    offset += limit;
    loadPokemon(offset, limit);
});

prevbtn.addEventListener('click', () => {
    offset -= limit;
    if (offset < 0) {
        offset = 0;
    }

    const content = document.querySelector('.content');
    content.className = 'content';

    nextbtn.style.display = 'block';
    prevbtn.style.display = 'block';

    loadPokemon(offset, limit);
});

function openPokemonDetail(pokemon) {
    const body = document.querySelector('body');
    const content = document.querySelector('.content');

    body.className = `body-${pokemon.type}`;

    content.className = 'content';
    content.classList.add(`content-${pokemon.type}`);

    const newSection = document.createElement('section');
    newSection.classList.add('content');

    const newHtml = `
        <div class="pokemon2">
            <div class="top2">
                <button class="back2" id="back">Voltar</button>
                <span class="number2">#${pokemon.number}</span>
            </div>
            <span class="name2">${pokemon.name}</span>
            <div class="details2">
                <ol class="types2">
                    ${pokemon.types.map((type) => `<li class="type2 ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="description2">
            <h2>stats</h2>
            <div id="contdesc2">
                <ol class="stats2">
                    <li class="hp">HP <br>
                        <progress value="${pokemon.stats.hp}" max="100">${pokemon.stats.hp} %</progress>
                    </li>
                    <li class="attack">Attack <br>
                        <progress value="${pokemon.stats.attack}" max="100">${pokemon.stats.attack} %</progress>
                    </li>
                    <li class="defense">Defense <br>
                        <progress value="${pokemon.stats.defense}" max="100">${pokemon.stats.defense} %</progress>
                    </li>
                    <li class="special-attack">Special attack <br>
                        <progress value="${pokemon.stats.specialAttack}" max="100">${pokemon.stats.specialAttack} %</progress>
                    </li>
                    <li class="special-defense">Special defense <br>
                        <progress value="${pokemon.stats.specialDefense}" max="100">${pokemon.stats.specialDefense} %</progress>
                    </li>
                    <li class="speed">Speed <br>
                        <progress value="${pokemon.stats.speed}" max="100">${pokemon.stats.speed} %</progress>
                    </li>
                </ol>
                <div class="desc" style="display: inline-flex;">
                    <ol class="title">
                        <li>Height:</li>
                        <li>Weight:</li>
                        <li>Abilities:</li>
                    </ol>
                    <ol>
                        <li>${pokemon.height}</li>
                        <li>${pokemon.weight}</li>
                        <li>${pokemon.ability.join(', ')}</li>
                    </ol>
                </div>
            </div>
        </div>
    `;

    newSection.innerHTML = newHtml;
    listapokemon.innerHTML = '';
    listapokemon.appendChild(newSection);

    const backButton = document.getElementById('back');
    backButton.addEventListener('click', () => {

        body.className = '';
        content.className = 'content';
        loadPokemon(offset, limit);

        nextbtn.style.display = 'block';
        prevbtn.style.display = 'block';
    });

    nextbtn.style.display = 'none';
    prevbtn.style.display = 'none';
}
