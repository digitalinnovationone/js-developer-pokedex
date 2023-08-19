const HIDDEN_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
    <path
        d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" />
  </svg>
  `;

class PokemonModalElement extends HTMLElement {
  constructor() {
    super();
  }

  async fetchDetails() {
    this.clearValues();
    const name = this.getAttribute('name');
    if (name) this.details = await pokeApi.getPokemonDetail(name);

    if (this.details) this.updateValues();
  }

  connectedCallback() {
    this.createElement();
    this.fetchDetails();
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['name', 'show'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      if (newValue === 'true')
        this.firstElementChild?.classList.add('p-modal--show');
      else this.firstElementChild?.classList.remove('p-modal--show');
    }

    this.fetchDetails();
  }

  adoptedCallback() {}

  createElement() {
    this.innerHTML = `
    <section id="p-modal__container" class="p-modal">
      <article class="p-modal__container pokemon--unknown">
        <button class="p-modal__back" onClick="closeModal()">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path fill="currentColor" d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
          </svg>
          <p>Voltar</p>
        </button>
        <section class="p-modal__header">
          <aside>
            <h1 class="p-modal__header-name skeleton skeleton-text">Lorem</h1>
            <ol class="p-modal__types">
            </ol>
          </aside>
          <p class="p-modal__header-number skeleton skeleton-text">#000</p>
        </section>
        <section class="p-modal__content">
          <img class="p-modal__image"
            src="" alt="" />
          <section class="p-modal__abilities">
            <h4>
              Habilidades
            </h4>
            <article class="p-modal__abilities-list">
              <li class="p-modal__ability skeleton-text">Lorem</li>
              <li class="p-modal__ability skeleton-text">Lorem</li>
              <li class="p-modal__ability skeleton-text">Lorem</li>
            </article>
          </section>
          <section class="p-modal__stats">
            <h4>
              Status
            </h4>
            <article class="p-modal__stats-list">
              <div class="p-modal__stat">
                <p class="p-modal__stat-name">
                  HP
                </p>
                <p class="p-modal__stat-value">0</p>
              </div>
              <div class="p-modal__stat">
                <p class="p-modal__stat-name">
                  ATK
                </p>
                <p class="p-modal__stat-value">0</p>
              </div>
              <div class="p-modal__stat">
                <p class="p-modal__stat-name">
                  DEF
                </p>
                <p class="p-modal__stat-value">0</p>
              </div>
              <div class="p-modal__stat">
                <p class="p-modal__stat-name">
                  SpA
                </p>
                <p class="p-modal__stat-value">0</p>
              </div>
              <div class="p-modal__stat">
                <p class="p-modal__stat-name">
                  SpD
                </p>
                <p class="p-modal__stat-value">0</p>
              </div>
              <div class="p-modal__stat">
                <p class="p-modal__stat-name">
                  SDP
                </p>
                <p class="p-modal__stat-value">0</p>
              </div>
            </article>
          </section>
        </section>
      </article>
    </section>
    `;
  }

  clearValues() {
    const [container] = this.getElementsByClassName('p-modal__container');
    const [name] = this.getElementsByClassName('p-modal__header-name');
    const [number] = this.getElementsByClassName('p-modal__header-number');
    const [image] = this.getElementsByClassName('p-modal__image');
    const [abilities] = this.getElementsByClassName('p-modal__abilities-list');
    const stats = this.getElementsByClassName('p-modal__stat-value');

    container.classList.value = `p-modal__container pokemon--unknown`;
    name.classList.add('skeleton', 'skeleton-text');
    number.classList.add('skeleton', 'skeleton-text');

    image.setAttribute('src', '');

    abilities.innerHTML = `
    <li class="p-modal__ability skeleton-text">Lorem</li>
    <li class="p-modal__ability skeleton-text">Lorem</li>
    <li class="p-modal__ability skeleton-text">Lorem</li>
    `;

    for (const stat of stats) {
      stat.innerHTML = 0;
    }
  }

  updateValues() {
    const getStat = (name) =>
      this.details?.stats.find((statSlot) => statSlot.stat.name === name);

    const [container] = this.getElementsByClassName('p-modal__container');
    const [name] = this.getElementsByClassName('p-modal__header-name');
    const [types] = this.getElementsByClassName('p-modal__types');
    const [number] = this.getElementsByClassName('p-modal__header-number');
    const [image] = this.getElementsByClassName('p-modal__image');
    const [abilities] = this.getElementsByClassName('p-modal__abilities-list');
    const [hp, attack, defense, specialAttack, specialDefense, speed] =
      this.getElementsByClassName('p-modal__stat-value');

    const [typeSlot] = this.details.types;
    const type = typeSlot.type.name;
    const sprite = this.details.sprites.other.home.front_default;

    container.classList.value = `p-modal__container pokemon--${type}`;

    name.innerHTML = this.details.name;
    number.innerHTML = `#${this.details.id}`;

    image.setAttribute('src', sprite);

    types.innerHTML = this.details.types
      .map(
        (typeSlot) =>
          `<li class="pokemon__types-type">${typeSlot.type.name}</li>`,
      )
      .join('');
    abilities.innerHTML = this.details?.abilities
      .map(
        (abilitySlot) =>
          `<li class="p-modal__ability ${
            abilitySlot.is_hidden ? 'p-modal__ability--hide' : ''
          }">${abilitySlot.ability.name} ${
            abilitySlot.is_hidden ? HIDDEN_ICON : ''
          }</li>`,
      )
      .join('');

    hp.innerHTML = getStat('hp').base_stat;
    attack.innerHTML = getStat('attack').base_stat;
    defense.innerHTML = getStat('defense').base_stat;
    specialAttack.innerHTML = getStat('special-attack').base_stat;
    specialDefense.innerHTML = getStat('special-defense').base_stat;
    speed.innerHTML = getStat('speed').base_stat;

    name.classList.remove('skeleton', 'skeleton-text');
    number.classList.remove('skeleton', 'skeleton-text');
  }
}

customElements.define('pokemon-modal', PokemonModalElement);
