class PokemonCardElement extends HTMLElement {
  constructor() {
    super();
  }

  async fetchDetails() {
    this.details = await pokeApi.getPokemonDetail(this.getAttribute('name'));

    this.render();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick, true);

    this.render();
    this.fetchDetails();
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.fetchDetails();
  }

  adoptedCallback() {}

  handleClick() {
    modal.setAttribute('name', this.getAttribute('name'));
    modal.setAttribute('show', true);
  }

  render() {
    if (!this.details) {
      this.innerHTML = `
      <li class="pokemon pokemon--unknown">
        <span class="pokemon__number skeleton skeleton-text">
          #0
        </span>
        <span class="pokemon__name skeleton skeleton-text">
          Lorem
        </span>

        <div class="pokemon__details">
            <ol class="pokemon__types">
              <li class="pokemon__types-type skeleton skeleton-text">lorem</li>
              <li class="pokemon__types-type skeleton skeleton-text">lorem</li>
            </ol>

            <div class="skeleton pokemon__skeleton-image"></div>
        </div>
      </li>
      `;
    } else {
      const [typeSlot] = this.details.types;
      const sprite =
        this.details.sprites.versions['generation-v']['black-white'].animated
          .front_default;

      this.innerHTML = `
      <li class="pokemon pokemon--${typeSlot.type.name}">
        <span class="pokemon__number">#${this.details.id}</span>
        <span class="pokemon__name">${this.details.name}</span>

        <div class="pokemon__details">
            <ol class="pokemon__types">
                ${this.details.types
                  .map(
                    (typeSlot) =>
                      `<li class="pokemon__types-type">${typeSlot.type.name}</li>`,
                  )
                  .join('')}
            </ol>

            <img src="${sprite}"
                 alt="${this.details.name}">
        </div>
      </li>
    `;
    }
  }
}

customElements.define('pokemon-card', PokemonCardElement);
