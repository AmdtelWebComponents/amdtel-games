import { LitElement, css, html } from 'lit';

export class GameElement extends LitElement {
  static get properties() {
    return {
      options: { type: Array },
      correctAnswer: { type: Object },
      outputMessage: { type: String },
      gameAssets: { type: Object },
      score: { type: Number },
      tries: { type: Number },
      timer: { type: String },
      qstate: { type: Boolean },
      game: { type: String },
    };
  }

  constructor() {
    super();
    this.outputMessage = 'Welcome to Whose flag is it';
    this.score = 0;
    this.tries = 0;
    this.qstate = false;
    this.timer = '0:00';
    this.game = '';
    this.startTime = 0;
    this.lapseTime = 0;
  }

  static get styles() {
    return css`
    /* GameElement.css */
:host {
  display: block;
  box-sizing: border-box;
  font-family: 'Press Start 2P', cursive;
  background-color: #1d1d1d;
  color: #fff;
}

section {
  display: grid;
  grid-gap: 1rem;
  align-items: center;
  justify-items: center;
}

.game-chooser {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
}

.game-chooser button {
  padding: 0.5rem 1rem;
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.game-chooser button:hover {
  background-color: #ff4d2e;
}

.game-board {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "menu-area"
    "question-area"
    "answer-area";
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #333;
  border: 0.5rem solid #ff6347;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
}

.question-area {
  grid-area: question-area;
  background-color: #1d1d1d;
  padding: 1rem;
  max-width: 500px;
  max-height: 300px;
  margin: 0 auto;
}

.question-area img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.btn {
  margin: 0.25rem;
  padding: 0.75rem 1.25rem;
  font-size: 1.2rem;
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #ff4d2e;
}

.answer-area {
  grid-area: answer-area;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  padding: 1rem;
  text-align: center;
}

.menu-area {
  grid-area: menu-area;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ff6347;
  color: #fff;
  border-radius: 0.5rem 0.5rem 0 0;
}

.nav {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: color 0.3s;
}

.nav:hover {
  color: #ff4d2e;
}

@media (max-width: 480px) {
  .game-board {
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      "menu-area"
      "question-area"
      "answer-area"
      "answer-area";
  }

  .answer-area {
    flex-direction: column;
  }

  .btn {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }
}
    `;
  }

  render() {
    return html`${this.qstate
      ? html`
          <section class="game-board" aria-live="polite">
            <div class="menu-area">
              <p>Score: <span>${this.score}/${this.tries}</span> Time: <span>${this.timer}</span></p>
              <button class="nav" @click="${() => this.qstate = !this.qstate}" aria-label="Toggle menu">
                ${this.qstate ? 'Menu...' : 'Close Menu'}
              </button>
            </div>

            <div class="question-area">
              <img
                src="https://res.cloudinary.com/amdtel/image/upload/game-assets/${this.game}/${this.correctAnswer.code}.svg"
                alt="${this.correctAnswer.name}"
              />
            </div>

            ${this.answer
              ? html`
                  <div class="answer-area" @click="${this._pickRandomOption}">
                    ${this.outputMessage} <button aria-label="Try another">Try another...</button>
                  </div>
                `
              : html`
                  <div class="answer-area">
                    ${this.options.map(
                      (option) => html`
                        <button
                          id="${option.code}"
                          class="btn"
                          @click="${this._selectAnswer}"
                          aria-label="${option.name}"
                        >
                          ${option.name}
                        </button>
                      `
                    )}
                  </div>
                `}
          </section>
        `
      : html`
          <button class="nav" onclick="location.href='/'" type="button">Exit...</button>
          <section class="game-chooser">
            <div class="intro">Welcome to Whose Who!!! Pick a version to play...</div>
            ${['world-flags', 'us-state-flags'].map(
              (game) => html`<button id="${game}" @click="${this.loadAssets}">${game.replace('-', ' ')}</button>`
            )}
            <!-- ... (other game buttons omitted for brevity) -->
          </section>
        `}`;
  }

  loadAssets = async (e) => {
    this.game = e.currentTarget.id;
    try {
      this.gameAssets = await (await fetch(`https://res.cloudinary.com/amdtel/raw/upload/game-assets/${this.game}/game-assets.json`)).json();
      this.pickRandomOptions();
      this.qstate = true;
    } catch (error) {
      console.error('Error fetching game assets:', error);
      this.outputMessage = 'Failed to load game assets. Please try again later.';
    }
  };

  pickRandomOptions = () => {
    const { assets } = this.gameAssets;
    const indices = this._getRandomIndices(assets.length, 2);
    this.options = indices.map((index) => assets[index]);
    this.correctAnswer = this.options[Math.floor(Math.random() * 2)];
    this.answer = false;
    this.startTime = Date.now();
  };

  _getRandomIndices = (length, count) => {
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * length));
    }
    return [...indices];
  };

  _selectAnswer = (e) => {
    const isCorrect = e.target.id === this.correctAnswer.code;
    this.updateTimer();
    this.updateScore(isCorrect);
    this.answer = true;
    this.tries += 1;
  };

  updateTimer = () => {
    const elapsedTime = Date.now() - this.startTime;
    this.lapseTime += elapsedTime;
    this.timer = new Date(this.lapseTime).toISOString().slice(11, -5);
  };

  updateScore = (isCorrect) => {
    if (isCorrect) {
      this.score += 1;
      this.outputMessage = `${this.correctAnswer.name} is the correct answer...`;
    } else {
      this.outputMessage = `${this.options.find((option) => option.code !== this.correctAnswer.code).name} is the wrong answer...`;
    }
  };

  _pickRandomOption = () => {
    this.pickRandomOptions();
    this.answer = false;
  };
}

window.customElements.define('game-element', GameElement);