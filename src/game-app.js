import { LitElement, css, html } from 'lit';

export class GameApp extends LitElement {
  static get properties(){
    return {
      games: Array,
      game: String,
      loadComplete: Boolean
    };
  }

  constructor(){
    super();
    this.loadComplete=false;
    this.games=[{name: 'Whose Who Game...', element: 'whose-who'}, {name: 'Another game to play', element: 'another-game'}];
    this.game='';
  }

  static get styles() {
    return css`
    :host { display: block; }
    :host([hidden]) { display: none; }

    section {
      display: grid;
      grid-gap: 1rem;
      align-items: center;
      justify-items: center;
    }
    `
  }

  render() {
    return html `
      ${this.game == '' ? html`
      <section>
      <h1>Amdtel Game Selection</h1>
      
      ${this.games.map(
    (item) => html`
          <button id="${item.element}" @click="${this.loadGame}">${item.name}</button>
        `)}
      </section>`
      : html`<game-element></game-element>`}
    `;
  }

  firstUpdated(){
    this.loadLazy();
  }

  loadGame(e){
    this.game = e.currentTarget.id
    this.loadLazy();
  }

  async loadLazy() {
    if(this.game != '' && !this.loadComplete) {
      this.loadComplete = true;
      return import(`./ge-${this.game}.js`).then((GameElement) => {
      }).catch((reason) => {
        console.log("LazyElement failed to load", reason);
      });
    }
  }
}

window.customElements.define('game-app', GameApp);
