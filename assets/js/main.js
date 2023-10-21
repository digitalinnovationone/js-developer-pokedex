const myBody = document.querySelector("body");
const welPokedex = document.getElementById("welcomePokedex");
const start = document.getElementById("btnStartPokedex");

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const contentDetail = document.getElementById("content");

const maxRecords = 151;
const limit = 10;
let offset = 0;


function getAboutPokemon(idPokemon) {
	const about = document.getElementById("about")

	pokeApi.getFlavorText(idPokemon).then((flavorText) =>
		about.insertAdjacentHTML("beforeend", `<p>${flavorText}</p>`)
	)
} 

function evolutions(pokemon) {
	const evo = document.getElementById("evo");

	pokeApi.getEvolutionChain(pokemon.number)
		.then((evoChain) =>

			evoChain.forEach( async (pokemonName) => {
				 
				pokeApi.getPokemon(pokemonName).then((p) => {
				
				evo.insertAdjacentHTML("beforeend", convertEvolutionChainToDetail(p));
					
				})
			}
		) );
}

function convertEvolutionChainToDetail(pokemon) {
	return `
		<div>
			<img src="${pokemon.photo}" alt="${pokemon.name}"/>
		</div>
	`;
}

function convertPokemonToLi(pokemon) {
	return `
        <li class="pokemon ${pokemon.type}">

            <div type="button" class="clickArea" id="${pokemon.number}"></div>

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
						.map((type) => `<li class="type ${type}">${type}</li>`)
						.join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map(convertPokemonToLi).join("");
		pokemonList.innerHTML += newHtml;
	});
}

function convertStats(pokemon) {
	const statsName = Object.getOwnPropertyNames(pokemon.stats);

	return statsName.map((stName) => `
			<div class="stats">
				<span>${stName}</span>
				<span>${pokemon.stats[stName]}</span>

				<div class="border">
					<div class="center" style="width:${pokemon.stats[stName]}%"></div>
				</div>

			</div>
	`).join("")
}

function convertPokemonToLiDetail(pokemon) {
	return `
        <div id="pokemonCard${pokemon.number}" class="pokemonCard ${pokemon.type}">
			<div class="background"></div>
			<button type="button" id="btn${pokemon.number}" class="btnClose">x</button>
			<span class="name">${pokemon.name}</span>

			<div class="infoPokemon">

				<div class="detail">
					<img src="${pokemon.photo}" alt="${pokemon.name}" class="imgPokemon" />  
                	<ol class="types">
                    	${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                	</ol>
				</div>

				<div class="info">
					<ul class="menu">
						<li><a class="menu_active" href="#" onclick="show('.about', this);">About</a></li>
						<li><a class="menu_notActive" href="#" onclick="show('.baseStats', this);">Base Stats</a></li>
						<li><a class="menu_notActive" href="#" onclick="show('.evolution', this);">Evolution</a></li>
					</ul>

					<div id="about" class="about" >
						<hr/>
					</div>

					<div class="baseStats">
						<hr/>
						<div>${convertStats(pokemon)}</div>
					</div>
					<div class="evolution">
						<hr/>
						<div id="evo"></div>
					</div>

				</div>

			</div>
        </div>
    `;
}

function insertPokemonDetail(idPokemon) {
	pokeApi.getPokemon(idPokemon)
		.then((pokemon) => {
			contentDetail.insertAdjacentHTML("beforeend", convertPokemonToLiDetail(pokemon));
			evolutions(pokemon);
			getAboutPokemon(pokemon.number);
		}
		);

}

function removePokemonDetail(e) {
	const winFloat = document.getElementById(`pokemonCard${e.target.id}`);
	document
		.getElementById(`btn${e.target.id}`)
		.addEventListener("click", () => {
			winFloat.parentElement.removeChild(winFloat);
		});
}

async function loadPokemonDetail(e) {
	
	if (
		e.target &&
		e.target.className === "clickArea" &&
		document.getElementById(`pokemonCard${e.target.id}`) === null
	) {
		await insertPokemonDetail(e.target.id);
		setTimeout(() => removePokemonDetail(e), 2000);
	}
}

function startPokedex() {
	welPokedex.parentElement.removeChild(welPokedex);
	myBody.classList.remove("body");
	contentDetail.style.visibility = "visible";
	loadPokemonItens(offset, limit);
}

function show(nameClass, target) {
	const about = document.querySelector(".about");
	const baseStats = document.querySelector(".baseStats");
	const evolution = document.querySelector(".evolution");
    let divTarget = document.querySelector(nameClass);

	divTarget.style.display = 'block';

	if (divTarget === about) {
		updateActive(target);

		baseStats.style.display = 'none'
		evolution.style.display = 'none'

	} else if (divTarget === baseStats) {
		updateActive(target);

		about.style.display = 'none'
		evolution.style.display = 'none'

	} else if (divTarget === evolution){
		updateActive(target);

		baseStats.style.display = 'none'
		about.style.display = 'none'
	}

}

function updateActive(target) {
	const actives = document.getElementsByClassName('menu_active');

	if (target.className == 'menu_notActive') {
		for (let act of actives) {
			act.classList.replace('menu_active', 'menu_notActive');
			target.className = 'menu_active';
		}
	}
}

start.addEventListener("click", () => {
	startPokedex();

	pokemonList.addEventListener("click", (e) => loadPokemonDetail(e));

	loadMoreButton.addEventListener("click", () => {
		offset += limit;
		const qtdRecordsWithNexPage = offset + limit;

		if (qtdRecordsWithNexPage >= maxRecords) {
			const newLimit = maxRecords - offset;
			loadPokemonItens(offset, newLimit);

			loadMoreButton.parentElement.removeChild(loadMoreButton);
		} else loadPokemonItens(offset, limit);
	});
});
