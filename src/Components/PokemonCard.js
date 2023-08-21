class PokemonCardElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  async fetchDetails() {
    const name = this.getAttribute('name');
    if (!name) return;

    this.details = await pokeApi.getPokemonDetail(this.getAttribute('name'));

    this.update();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick, true);

    this.shadow.appendChild(this.build());
    this.shadow.appendChild(this.styles());
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.fetchDetails();
  }

  handleClick() {
    modal.setAttribute('name', this.getAttribute('name'));
    modal.setAttribute('show', true);
  }

  update() {
    const [typeSlot] = this.details.types;
    const sprite =
      this.details.sprites.versions['generation-v']['black-white'].animated
        .front_default;
    const container = this.shadow.querySelector('.pokemon');
    const number = this.shadow.querySelector('.pokemon__number');
    const name = this.shadow.querySelector('.pokemon__name');
    const types = this.shadow.querySelector('.pokemon__types');
    const image = this.shadow.querySelector('img');

    container.setAttribute('class', `pokemon pokemon--${typeSlot.type.name}`);

    number.setAttribute('class', `pokemon__number`);
    number.innerText = `#${this.details.id}`;

    name.setAttribute('class', `pokemon__name`);
    name.innerText = this.details.name;

    types.replaceChildren();

    for (let { type } of this.details.types) {
      const typeElement = document.createElement('li');
      typeElement.setAttribute('class', `pokemon__types-type`);
      typeElement.innerText = type.name;

      types.appendChild(typeElement);
    }

    image.removeAttribute('class');
    image.setAttribute('src', sprite);
  }

  build() {
    const container = document.createElement('li');
    container.setAttribute('class', `pokemon pokemon--unknown`);

    const number = document.createElement('span');
    number.setAttribute('class', `pokemon__number skeleton skeleton-text`);
    number.innerText = '#0';

    const name = document.createElement('span');
    name.setAttribute('class', `pokemon__name skeleton skeleton-text`);
    name.innerText = 'Lorem';

    const details = document.createElement('div');
    details.setAttribute('class', 'pokemon__details');

    const types = document.createElement('ol');
    types.setAttribute('class', 'pokemon__types');

    const type = document.createElement('li');
    type.setAttribute('class', `pokemon__types-type skeleton skeleton-text`);
    type.innerText = 'lorem';

    const image = document.createElement('img');
    image.setAttribute('class', 'skeleton pokemon__skeleton-image');

    container.appendChild(number);
    container.appendChild(name);

    types.appendChild(type.cloneNode(true));
    types.appendChild(type.cloneNode(true));

    details.appendChild(types);
    details.appendChild(image);

    container.appendChild(details);

    return container;
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
    .pokemon {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border-radius: 1rem;

      height: 8.125rem;

      cursor: pointer;

      position: relative;
      z-index: 1;

      overflow: hidden;
      box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.2);

      transition: transform 0.2s ease-in-out;
    }

    .pokemon::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;

      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(0.8rem);
      -webkit-backdrop-filter: blur(0.8rem);

      background-image: url(/assets/img/pokeball.svg);
      background-position: 110% 150%;
      background-size: 7rem;
      background-repeat: no-repeat;
    }

    .pokemon:hover {
      transform: scale(1.05);
    }

    .pokemon__number {
      color: #f3f3f3;
      opacity: 0.5;
      font-size: 0.625rem;

      max-width: fit-content;
    }

    .pokemon__name {
      text-transform: capitalize;
      color: #fff;
      margin: 0.25rem 0;

      max-width: fit-content;
    }

    .pokemon__details {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .pokemon__types {
      padding: 0.4rem 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .pokemon__types-type {
      color: #fff;
      padding: 0.25rem 0.5rem;
      font-size: 0.7rem;
      border-radius: 1rem;
      filter: brightness(1.1);
      text-align: center;

      text-transform: capitalize;

      background-color: rgba(255, 255, 255, 0.2);
    }

    .pokemon__details img {
      position: absolute;
      height: 5rem;

      right: 0.3rem;
      bottom: 0.3rem;
    }

    .pokemon--unknown {
      background-color: #d2d5da;
    }

    .pokemon--normal {
      background: var(--normal);
    }

    .pokemon--grass {
      background: var(--grass);
    }

    .pokemon--fire {
      background: var(--fire);
    }

    .pokemon--water {
      background: var(--water);
    }

    .pokemon--electric {
      background: var(--electric);
    }

    .pokemon--ice {
      background: var(--ice);
    }

    .pokemon--ground {
      background: var(--ground);
    }

    .pokemon--flying {
      background: var(--flying);
    }

    .pokemon--poison {
      background: var(--poison);
    }

    .pokemon--fighting {
      background: var(--fighting);
    }

    .pokemon--psychic {
      background: var(--psychic);
    }

    .pokemon--dark {
      background: var(--dark);
    }

    .pokemon--rock {
      background: var(--rock);
    }

    .pokemon--bug {
      background: var(--bug);
    }

    .pokemon--ghost {
      background: var(--ghost);
    }

    .pokemon--steel {
      background: var(--steel);
    }

    .pokemon--dragon {
      background: var(--dragon);
    }

    .pokemon--fairy {
      background: var(--fairy);
    }

    .skeleton {
      animation: skeleton-loading 1s linear infinite alternate;
    }

    .skeleton-text {
      min-height: 0.8rem;

      color: transparent !important;
    }

    .pokemon__skeleton-image {
      position: absolute;
      width: 5rem;
      aspect-ratio: 1;

      right: 0.3rem;
      bottom: 0.3rem;

      -webkit-mask-image: url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png);
      mask-image: url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png);
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: 100%;
      mask-size: 100%;
      -webkit-mask-position: center;
      mask-position: center;
    }

    @keyframes skeleton-loading {
      0% {
        background-color: #c2cfd6;
      }
      100% {
        background-color: #f0f3f5;
      }
    }

    `;
    return style;
  }
}

customElements.define('pokemon-card', PokemonCardElement);
