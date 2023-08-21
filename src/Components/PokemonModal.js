class PokemonModalElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  async fetchDetails() {
    const name = this.getAttribute('name');
    if (!name) return;

    this.details = await pokeApi.getPokemonDetail(name);

    this.update();
  }

  connectedCallback() {
    this.fetchDetails();

    this.shadow.appendChild(this.build());
    this.shadow.appendChild(this.styles());
  }

  static get observedAttributes() {
    return ['name', 'show'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      if (newValue === 'true')
        this.shadow.firstElementChild.classList.add('p-modal--show');
      else {
        this.shadow.firstElementChild.classList.remove('p-modal--show');
        setTimeout(() => {
          this.shadow.firstElementChild.replaceChildren(
            this.build().firstElementChild,
          );
        }, 1000);
      }
    }

    if (name === 'name') this.fetchDetails();
  }

  update() {
    const [typeSlot] = this.details.types;
    const sprite = this.details.sprites.other.home.front_default;
    const container = this.shadow.querySelector('.p-modal__container');
    const number = this.shadow.querySelector('.p-modal__header-number');
    const name = this.shadow.querySelector('.p-modal__header-name');
    const types = this.shadow.querySelector('.p-modal__types');
    const image = this.shadow.querySelector('.p-modal__image');
    const abilities = this.shadow.querySelector('.p-modal__abilities-list');
    const [HP, ATK, DEF, SpA, SpD, SPD] = this.shadow.querySelectorAll(
      '.p-modal__stat-value',
    );

    container.setAttribute(
      'class',
      `p-modal__container pokemon--${typeSlot.type.name}`,
    );

    number.setAttribute('class', `p-modal__header-number`);
    number.innerText = `#${this.details.id}`;

    name.setAttribute('class', `p-modal__header-name`);
    name.innerText = this.details.name;

    types.replaceChildren();

    for (let { type } of this.details.types) {
      const typeElement = document.createElement('li');
      typeElement.setAttribute('class', `pokemon__types-type`);
      typeElement.innerText = type.name;

      types.appendChild(typeElement);
    }

    image.setAttribute('src', sprite);

    abilities.replaceChildren();

    const HIDDEN_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
      <path
          d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" />
    </svg>
    `;

    for (let { is_hidden, ability } of this.details.abilities) {
      const abilityElement = document.createElement('li');
      abilityElement.setAttribute(
        'class',
        `p-modal__ability ${is_hidden ? 'p-modal__ability--hide' : ''}`,
      );
      abilityElement.innerHTML = `${ability.name} ${
        is_hidden ? HIDDEN_ICON : ''
      }`;

      abilities.appendChild(abilityElement);
    }

    const getStat = (name) =>
      this.details.stats.find((statSlot) => statSlot.stat.name === name);

    HP.innerHTML = getStat('hp').base_stat;
    ATK.innerHTML = getStat('attack').base_stat;
    DEF.innerHTML = getStat('defense').base_stat;
    SpA.innerHTML = getStat('special-attack').base_stat;
    SpD.innerHTML = getStat('special-defense').base_stat;
    SPD.innerHTML = getStat('speed').base_stat;
  }

  build() {
    const modal = document.createElement('div');
    modal.setAttribute('class', `p-modal`);

    const container = document.createElement('article');
    container.setAttribute('class', `p-modal__container pokemon--unknown`);

    const backButton = document.createElement('button');
    backButton.setAttribute('class', `p-modal__back`);
    backButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
      <path fill="currentColor" d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
    </svg>
    <p>Voltar</p>
    `;
    backButton.onclick = () => this.setAttribute('show', false);

    const header = document.createElement('header');
    header.setAttribute('class', `p-modal__header`);

    const asideHeader = document.createElement('aside');

    const name = document.createElement('h1');
    name.setAttribute('class', 'p-modal__header-name skeleton skeleton-text');
    name.innerText = 'lorem';

    const types = document.createElement('ol');
    types.setAttribute('class', 'p-modal__types');

    const type = document.createElement('li');
    type.setAttribute('class', `pokemon__types-type skeleton skeleton-text`);
    type.innerText = 'lorem';

    const number = document.createElement('p');
    number.setAttribute(
      'class',
      'p-modal__header-number skeleton skeleton-text',
    );
    number.innerText = '#000';

    const content = document.createElement('section');
    content.setAttribute('class', 'p-modal__content');

    const image = document.createElement('img');
    image.setAttribute('class', 'p-modal__image');

    const abilities = document.createElement('section');
    abilities.setAttribute('class', 'p-modal__abilities');

    const abilitiesTitle = document.createElement('h4');
    abilitiesTitle.innerText = 'Habilidades';

    const abilitiesList = document.createElement('ol');
    abilitiesList.setAttribute('class', 'p-modal__abilities-list');

    const ability = document.createElement('li');
    ability.setAttribute('class', 'p-modal__ability skeleton-text');
    ability.innerHTML = 'Lorem';

    abilitiesList.appendChild(ability.cloneNode(true));
    abilitiesList.appendChild(ability.cloneNode(true));

    const stats = document.createElement('section');
    stats.setAttribute('class', 'p-modal__stats');

    const statsTitle = document.createElement('h4');
    statsTitle.innerText = 'Status';

    const statsList = document.createElement('ol');
    statsList.setAttribute('class', 'p-modal__stats-list');

    const statsArray = ['HP', 'ATK', 'DEF', 'SpA', 'SpD', 'SPD'];

    for (let stat of statsArray) {
      const statElement = document.createElement('li');
      statElement.setAttribute('class', 'p-modal__stat');

      const statName = document.createElement('p');
      statName.setAttribute('class', 'p-modal__stat-name');
      statName.innerText = stat;

      const statValue = document.createElement('p');
      statValue.setAttribute('class', 'p-modal__stat-value');
      statValue.innerText = '0';

      statElement.appendChild(statName);
      statElement.appendChild(statValue);
      statsList.appendChild(statElement);
    }

    stats.appendChild(statsTitle);
    stats.appendChild(statsList);

    abilities.appendChild(abilitiesTitle);
    abilities.appendChild(abilitiesList);

    content.appendChild(image);
    content.appendChild(abilities);
    content.appendChild(stats);

    types.appendChild(type.cloneNode(true));
    types.appendChild(type.cloneNode(true));

    asideHeader.appendChild(name);
    asideHeader.appendChild(types);

    header.appendChild(asideHeader);
    header.appendChild(number);

    container.appendChild(backButton);
    container.appendChild(header);
    container.appendChild(content);

    modal.appendChild(container);

    return modal;
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
    .p-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99;

      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(0.2rem);
      -webkit-backdrop-filter: blur(0.2rem);

      display: flex;
      align-items: center;
      justify-content: center;

      visibility: hidden;
      pointer-events: none;
      transition: all 0.5s;
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

    .p-modal--show {
      visibility: visible;
      pointer-events: all;
    }

    .p-modal--show .p-modal__container {
      top: 0;
      opacity: 1;
    }

    .p-modal__container {
      width: 23rem;
      max-width: 23rem;
      height: 34rem;

      border-radius: 2rem;

      display: flex;
      flex-direction: column;
      top: -20%;
      opacity: 0;

      position: relative;

      transition: all 0.4s ease-in-out;
    }

    .p-modal__content {
      flex: 1;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(2rem);
      -webkit-backdrop-filter: blur(2rem);
      border-radius: 2rem;

      display: flex;
      flex-direction: column;
      gap: 3rem;

      box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.6);

      position: relative;

      padding: 3rem 2rem 2rem 2rem;
    }

    .p-modal__image {
      width: 12rem;
      height: auto;

      position: absolute;

      bottom: 100%;
      left: 50%;
      transform: translate(-50%, 20%);
    }

    .p-modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 0.5rem 1rem 8rem 1rem;

      background-image: url(/assets/img/pokeball.svg);
      background-position: 120% 0%;
      background-size: 12rem;
      background-repeat: no-repeat;
    }

    .p-modal__header aside {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .p-modal__header h1,
    .p-modal__header p {
      color: #fff;
      margin: 0;
    }

    .p-modal__types {
      margin: 0;
      list-style: none;
      padding: 0;
      display: flex;
      gap: 0.2rem;
    }

    .p-modal__back {
      appearance: none;
      background: transparent;
      border: none;

      padding: 0;
      margin: 0.4rem 0 0 1rem;

      display: flex;
      align-items: center;
      gap: 0.3rem;

      width: fit-content;
      height: fit-content;

      cursor: pointer;

      color: #fff;
    }

    .p-modal__back > svg {
      width: 1.5rem;
      height: auto;
    }

    .p-modal__abilities,
    .p-modal__stats {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .p-modal__abilities > h4,
    .p-modal__stats > h4 {
      margin: 0;
      text-align: center;
      text-transform: uppercase;
      font-weight: 900;
    }

    .p-modal__abilities > ol,
    .p-modal__stats > ol {
      display: flex;
      gap: 0.8rem;
      justify-content: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .p-modal__ability {
      background-color: rgba(182, 173, 173, 0.2);
      border-radius: 0.5rem;

      padding: 0.2rem 1rem;

      font-size: 0.8rem;

      display: flex;
      gap: 0.9rem;

      text-transform: capitalize;
    }

    .p-modal__ability svg {
      width: 0.8rem;
      height: auto;
    }

    .p-modal__ability--hide {
      background-color: rgba(201, 9, 9, 0.2);
    }

    .p-modal__stat {
      background-color: rgba(182, 173, 173, 0.2);
      border-radius: 0.8rem;

      padding: 0.2rem 0.2rem 0.5rem;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .p-modal__stat-name,
    .p-modal__stat-value {
      margin: 0;
      text-align: center;

      font-size: 0.9rem;
    }

    .p-modal__stat-name {
      color: #fff;
      border-radius: 50%;
      width: 1.8rem;
      height: 1.8rem;

      font-size: 0.7rem;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: #df2140;
    }

    .p-modal__stat:nth-child(2) .p-modal__stat-name {
      background-color: #ff9248;
    }

    .p-modal__stat:nth-child(3) .p-modal__stat-name {
      background-color: #fedc42;
    }

    .p-modal__stat:nth-child(4) .p-modal__stat-name {
      background-color: #85ddff;
    }

    .p-modal__stat:nth-child(5) .p-modal__stat-name {
      background-color: #85ddff;
    }

    .p-modal__stat:nth-child(6) .p-modal__stat-name {
      background-color: #fb94a8;
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

customElements.define('pokemon-modal', PokemonModalElement);
