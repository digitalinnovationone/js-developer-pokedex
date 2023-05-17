function renderizarItemPokemon(pokemonArray, initialIndex, renderLimit) {
        cleanList()

        const fragment = new DocumentFragment()
        const pokeList = document.createElement('ol')
        construtorElemento(pokeList, 'pokemons', '')
        const mainSection = document.querySelector('main')

        for (let i = initialIndex; i < initialIndex + renderLimit; i++) {
                if (pokemonArray.length <= i) break
                pokeList.appendChild(pokemonListElement(pokemonArray[i]))
        }

        fragment.appendChild(pokeList)
        mainSection.appendChild(fragment)

        const loadingDiv = document.getElementById('load')
        loadingDiv.setAttribute('style', 'display: none')
}

function construtorElemento(element, className, text, parentElement) {
        element.className = className
        element.innerText = text
        if (parentElement !== undefined) parentElement.appendChild(element)
}

function pokemonListElement(apiItem) {

        const listItem = document.createElement('li')
        construtorElemento(listItem, `pokemon ${apiItem.Types[0]}`, '')

        const number = document.createElement('span')
        construtorElemento(number, 'number', '#' + apiItem.Number, listItem)

        const name = document.createElement('span')
        const capitalizedName = apiItem.Name[0].toUpperCase() + apiItem.Name.substring(1)

        construtorElemento(name, 'name', capitalizedName, listItem)

        const pokeImg = document.createElement('img')
        pokeImg.src = apiItem.Sprite || '../assets/imagens/indisponivel.png'
        pokeImg.alt = apiItem.Name
        pokeImg.loading = 'lazy'
        construtorElemento(pokeImg, 'pokemon-image', '', listItem)

        const typeDiv = document.createElement('div')
        construtorElemento(typeDiv, 'detail', '', listItem)

        const typesList = document.createElement('ul')
        construtorElemento(typesList, 'types', 'Tipos', typeDiv)
        apiItem.Types.forEach(e => {
                const typesapiItem = document.createElement('li')
                construtorElemento(typesapiItem, `type ${e}`, e[0].toUpperCase() + e.substring(1), typesList)
        })

        const abilitiesList = document.createElement('ul')
        construtorElemento(abilitiesList, 'abilities', 'Habilidades', listItem)

        apiItem.Abilities.forEach(item => {
                const abilitiesItem = document.createElement('li')
                construtorElemento(abilitiesItem, 'ability', item[0].toUpperCase() + item.substring(1), abilitiesList)
        })

        return listItem
}

function filterPokedex(filter, searchValue) {
        let filteredList = []
        const value = searchValue.toLowerCase()

        switch (filter) {
                case 'Tipo':
                        filteredList = currentPokeList.filter((pokemon) => {
                                return pokemon.Types.includes(value)
                        })
                        break

                case 'Habilidade':
                        filteredList = currentPokeList.filter((pokemon) => {
                                return pokemon.Abilities.includes(value)
                        })
                        break

                case 'Pokemon':
                        filteredList = currentPokeList.filter((pokemon) => {
                                return pokemon.Name === value
                        })
                        break
        }

        if (filteredList.length === 0) {
                alert('Nenhum Pokemon encontrado.')
                return currentPokeList
        }

        currentPokeList = filteredList
        return currentPokeList
}

