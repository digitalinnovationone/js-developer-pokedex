const content = document.getElementById('content')
const pokeName = document.getElementById('pokeName')
const pokeNumber = document.getElementById('pokeNumber')
const pokeTypes = document.getElementById('pokeTypes')
const pokeImag = document.getElementById('pokeImag')

const info = document.getElementById('information')
const stats = document.getElementById('stats')
const mInfo = document.getElementById('mInfo')
const mStats = document.getElementById('mStats')

function addZeroes(pokemonOrder) {
    var numberWithZeroes = String(pokemonOrder);
    var counter = numberWithZeroes.length;
      
    while(counter < 3) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
  return numberWithZeroes;
}

function closeTab(){
    window.close()
}

//Menu Informations/Status
function information(){
    //Alterar CSS da lista Information e do Status
    info.style.opacity = "1"
    stats.style.opacity = "0"

    //Alterar CSS do botão Informations do menu
    mInfo.style.color = "black"
    mInfo.style.fontWeight = "bold"
    mInfo.style.borderBottom = "3px solid lightgray"

    //Alterar CSS do botão Status do menu
    mStats.style.fontWeight = "400"
    mStats.style.color = "gray"
    mStats.style.borderBottom = "none"
}
mInfo.addEventListener('click', () => information())

mStats.addEventListener('click', () => {
    //Alterar css da lista Information e do Status
    stats.style.opacity = "1"
    info.style.opacity = "0"

    //Alterar CSS do botão Status do menu
    mStats.style.color = "black"
    mStats.style.fontWeight = "bold"
    mStats.style.borderBottom = "3px solid lightgray"

    //Alterar CSS do botão Informations do menu
    mInfo.style.fontWeight = "400"
    mInfo.style.color = "gray"
    mInfo.style.borderBottom = "none"
})

//Pegar id via GET
function getId(){
    const getUrl = window.location.href
    const paramUrl = new URL(getUrl)
    const id = paramUrl.searchParams.get("id")
    return id
}

//Inserir, dinamicamente, informações na página
function pokemonDetails(id){
    pokeApi.getPokemonDetailById(id).then((pokemonDet) => {
        //Cor de fundo de acordo com o tipo
        content.classList.add(`${pokemonDet.type}`)
        
        //Adicionar o nome do Pokemon
        pokeName.innerHTML = pokemonDet.name

        //Adicionar id do Pokemon
        pokeNumber.innerHTML = `#${addZeroes(pokemonDet.id)}`

        //Adicionar tipos do Pokemon
        pokeTypes.innerHTML = `
        <ol class="types">
            ${pokemonDet.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        `

        //Adicionar imagem do Pokemon
        pokeImag.innerHTML = `<img src='${pokemonDet.photo}' alt='${pokemonDet.name}'>`

        //Adicionando "Informations" do Pokemon
        info.innerHTML = `
            <ul>
                <li>
                    <span>Abilities:</span> 
                    ${pokemonDet.ability.map((slot) => `<div>${slot.ability.name}</div>`).join('\u2001')}
                </li>
                <li>
                    <span>Weight:</span> 
                    <div>${pokemonDet.weight/10} kg</div>
                </li>
                <li>
                    <span>Height:</span>
                    <div>${pokemonDet.height/10} m</div>
                </li>
            </ul>
        `

        //Adicionando "Stats" do Pokemon
        stats.innerHTML = `
        <ul>
            <li>
                <span>HP:</span> 
                <div>${pokemonDet.hp}</div>
            </li>
            <li>
                <span>Attack:</span> 
                <div>${pokemonDet.attack}</div>
            </li>
            <li>
                <span>Defense:</span> 
                <div>${pokemonDet.defense}</div>
            </li>
            <li>
                <span>Sp. Atk:</span> 
                <div>${pokemonDet.spAtk}</div>
            </li>
            <li>
                <span>Sp. Def:</span> 
                <div>${pokemonDet.spDef}</div>
            </li>
            <li>
                <span>Speed:</span> 
                <div>${pokemonDet.speed}</div>
            </li>
            <li>
                <span>Total:</span>
                <div>${pokemonDet.total}</div>
            </li>
        </ul>
        `
    })
}

pokemonDetails(getId())

window.onload = information()