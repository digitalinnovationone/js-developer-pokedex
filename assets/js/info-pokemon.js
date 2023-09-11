
const pokeID = window.location.search.split('=')[1];
const titleDetails = document.querySelector('.title_details')
const getDivDetail = document.querySelector('.detail_card')

async function getPokemonDetail() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`
    const response = await fetch(url)
    const data = await response.json()
    return data
};

async function convertPokemon() {
    const pokemon = await getPokemonDetail();
    getDivDetail.className = `detail_card ${pokemon.types[0].type.name}`;
    titleDetails.innerHTML = `${pokemon.name} status`;
    getDivDetail.innerHTML = `

        <div class="title_and_types">
                <div class="title">
                    <span class="number">#${pokemon.id}</span>
                </div>
                
                <div class="detail_card__body__types">
                    <div class="detail_card__body__types__title">Types</div>
                    ${
                        pokemon.types.map((type) => 
                        `<div class="detail_card__body__types__list__item ${type.type.name}">${type.type.name}</div>`).join('')
                    }
                </div>
            </div>

            <div class="info">
            <div class="detail_card__body__stats">
                <div class="detail_card__body__stats__title">Stats</div>
                <div class="detail_card__body__stats__list">
                    <div class="detail_card__body__stats__list__item">HP: ${pokemon.stats[0].base_stat}</div>
                    <div class="detail_card__body__stats__list__item">Attack: ${pokemon.stats[1].base_stat}</div>
                    <div class="detail_card__body__stats__list__item">Defense: ${pokemon.stats[2].base_stat}</div>
                    <div class="detail_card__body__stats__list__item">Special Attack: ${pokemon.stats[3].base_stat}</div>
                    <div class="detail_card__body__stats__list__item">Special Defense: ${pokemon.stats[4].base_stat}</div>
                    <div class="detail_card__body__stats__list__item">Speed: ${pokemon.stats[5].base_stat}</div>
                </div>
            </div>

            <div class="detail_card__body__image">
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
        </div>
        
        `
}

convertPokemon();