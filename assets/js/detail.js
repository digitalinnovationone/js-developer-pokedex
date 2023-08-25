const btnBack = document.querySelector('.btnBack');
const container = document.querySelector('.container');

function pokemonDetailPage() {
    pokeApi.getPokemonDetailPage()
        .then(pokemon => {
            console.log(pokemon);

            container.classList.add(`${pokemon.type}`)
            container.innerHTML = `
            <header>
            <div class="informations">
                <h1>${pokemon.name}</h1>
                <span>${pokemon.number}</span>
            </div>
            <div class="pokemon_type">
                ${pokemon.types.map((type) => `<span class="type ${pokemon.type}" >${type}</span>`).join('')}
            </div>
        </header>

        <div class="image_container"><img  class="pokemon_image" src="${pokemon.photo}" alt="${pokemon.name}"></div>
        
        <main class="content">
      
            <div class="nav_bar">
                <ul>
                    <li class="tab">about</li>
                    <li class="tab">base states</li>
                    <div class="line ${pokemon.type}"></div>
                </ul>
                <div class="tabContent about">
                        <ul class="dataName">
                            <li>Height</li>
                            <li>Weight</li>
                            <li>Abilities</li>
                        </ul>
                        <ul class="datas">
                            <li>${pokemon.height < 10 ? "0" + pokemon.height: pokemon.height}</li>
                            <li>${pokemon.weight < 10 ? "0" + pokemon.weight: pokemon.weight}</li>
                            <li>${pokemon.abilities}</li>
                        </ul>
                </div>
                <div class="tabContent base_states">
                    <ul class="dataName">
                        <li>HP</li>
                        <li>Attack</li>
                        <li>Deffense</li>
                    </ul>
                    <ul class="datas">
                        <li>${pokemon.hp}</li>
                        <li>${pokemon.attack}</li>
                        <li>${pokemon.deffense}</li>
                    </ul>
                </div>
            </div>
        </main>                
                
            `
            const tabs = document.querySelectorAll('.tab');
            const tabContent = document.querySelectorAll('.tabContent');

            tabs.forEach((tab, index) => tab.addEventListener('click', (e) => {
                const line = document.querySelector('.line');

                line.style.width = e.target.offsetWidth + 'px';
                line.style.left = e.target.offsetLeft + 'px';   

                tabContent.forEach(tab => {
                    tab.style.display ="none";
                    tab.style.dsiplay = "flex";
                })

                tabContent[index].style.display ="flex";
                tabContent[index].style.dsiplay = "none";


            }))
        })
        .catch(error => console.error(error))


        
}
pokemonDetailPage();




btnBack.addEventListener('click', () => window.location.href = "index.html")
