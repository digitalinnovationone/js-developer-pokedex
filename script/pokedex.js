const DEFAULT_SIZE_LIMIT = 151;
const DEFAULT_FETCH_SIZE = 10;

class Pokedex {
  currentOffset = 0;
  sizeLimit = DEFAULT_SIZE_LIMIT;
  fetchSize = 10;
  targetElement;

  constructor(
    sizeLimit = DEFAULT_SIZE_LIMIT,
    fetchSize = DEFAULT_FETCH_SIZE,
    targetElement
  ) {
    this.sizeLimit = sizeLimit;
    this.fetchSize = fetchSize;
    this.targetElement = targetElement;
  }
  async loadMorePokemon() {
    if (!(this.currentOffset + this.fetchSize >= this.sizeLimit)) {
      const pokemons = await PokeAPI.getPokemons(
        this.currentOffset,
        this.fetchSize
      );
      renderPokemonList(pokemons, this.targetElement);
      this.currentOffset += this.fetchSize;
    } else {
      const newFetchSize = this.sizeLimit - this.currentOffset;
      if (newFetchSize > 0) {
        const pokemons = await PokeAPI.getPokemons(
          this.currentOffset,
          newFetchSize
        );
        renderPokemonList(pokemons, this.targetElement);
        this.currentOffset += newFetchSize;
      }
    }
  }
}
