// Getting params from the url
const urlParam = new URLSearchParams(window.location.search).get('id');

// Main tag for the inner.
const statContent = document.getElementById('main');

// Separating the last letter / number with an ,
function separateLastCharacter(str) {
    return str.toString().length <= 1 ? str.toString() :
    str.toString().slice(0, -1) + ',' + str.toString().slice(-1);
}
  
// Separating the last 2 letter / number with an ,
function separateLastTwoCharacter(str) {
    return str.toString().length < 2 ? str.toString() + "0" :
    str.toString().slice(0, -1) + ',' + str.toString().slice(-2, -1) + str.toString().slice(-1);
}
  
// Loading the respective pokemon
pokeApi.getPokemonInformation(urlParam).then(showPageContent);

// Displaying content for each page
function showPageContent(pokemon){
    console.log(pokemon)
    statContent.innerHTML += `
        <section class="profile ${pokemon.type}">
            <div class="basic-infos"  id="stat">
                <div class="name-type">
                    <h2>${pokemon.name}</h2>
                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
                    </ul>
                </div>
                <span class="number" id="number">#${pokemon.number}</span>
            
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div><!-- top basic infos -->

            <div class="details">
                <div class="base-stats">
                    <nav>
                        <ul>
                            <li><a href="javascript:changeContent(1);" class="active" id="about" title="Sobre">Sobre</a></li>
                            <li><a href="javascript:changeContent(2);" id="status" title="Status Base">Status Base</a></li>
                            <li><a href="javascript:changeContent(3);" id="moves" title="Ataques">Ataques</a></li>
                        </ul>
                    </nav><!-- Navigation bar -->

                    <div class="content showContent" id="content1">
                        <div class="left" id="left">
                            <ul>
                                <li>Espécie:</li>
                                <li>Altura:</li>
                                <li>Peso:</li>
                                <li>Habilidades:</li>
                                <li>Grupo:</li>
                                <li>Habitat:</li>
                            </ul>
                        </div> 

                        <div class="right" id="right">
                            <ul>
                                <li class="infos">${pokemon.specie}</li>
                                <li class="infos">${separateLastTwoCharacter(pokemon.height)}cm</li>
                                <li class="infos">${separateLastCharacter(pokemon.weight)}kg</li>
                                <li class="infos">${pokemon.habilities.map((hability) => hability).join(',')}</li>
                                <li class="infos">${pokemon.groups.map((group) => group).join(', ')}</li>
                                <li class="infos">${pokemon.habitat}</li>
                            </ul>
                        </div>
                    </div><!-- Tab content -->

                    <div class="content" id="content2">
                        <div class="left" id="left">
                            <ul>
                                <li>HP:</li>
                                <li>Ataque:</li>
                                <li>Defesa:</li>
                                <li>Sp. Atq:</li>
                                <li>Sp. Def:</li>
                                <li>Velocidade:</li>
                                <li>Total:</li>
                            </ul>
                        </div>

                        <div class="right" id="right">
                            <ul>
                                ${pokemon.movesPower.map((power) =>
                                    `<li>
                                        ${power}
                                        <span style="display: flex; flex-direction: row;
                                        border: 1px solid ${pokemon.color}; width: ${power * 1.3}px;">
                                    </li>`).join('')
                                }
                                <li>
                                    ${pokemon.totalPower}
                                    <span style="display: flex; flex-direction: row;
                                     border: 1px solid blue; width: ${pokemon.totalPower/5}px">
                                </li>
                            </ul>
                        </div>
                    </div><!-- Tab content -->

                    <div class="content" id="content3">
                        <div class="moves">
                            ${pokemon.moves.map((move) => `<div class="contents"><span>${move}</span></div>`).join('')} 
                        </div>
                    </div><!-- Tab content -->
                </div><!-- Base status -->
            </div>

        </section><!-- pokemon stats -->
    `;
}

// Changing tabs
function changeContent(index){
    const navItems = ['about', 'status', 'moves'], contentItems = ['content1', 'content2', 'content3'];


    navItems.forEach(item => {document.getElementById(item).classList.remove('active');});
    document.getElementById(navItems[index - 1]).classList.add('active');
    contentItems.forEach(item => {document.getElementById(item).classList.remove('showContent');});
    document.getElementById(contentItems[index - 1]).classList.add('showContent');
}

