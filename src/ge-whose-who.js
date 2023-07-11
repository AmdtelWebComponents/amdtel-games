import { LitElement, css, html } from 'lit';

export class GameElement extends LitElement {
  
  static get properties(){
    return {
      optionA: Object,
      optionB: Object,
      outputMessage: String,
      correctAnswer: Object,
      gameAssets: Object,
      score: Number,
      tries: Number,
      timer: Date,
      qstate: Boolean,
      answer: Boolean,
      game: String
    };
  }
  
  constructor(){
    super();
    this.outputMessage='Welcome to Whose flag is it';
    this.score=0;
    this.tries=0;
    this.qstate=false;
    this.answer=false;
    this.timer=0;
    this.startTimer=0;
    this.lapseTimer=0;
    this.game='';
    
  }

  static get styles() {
    return css`
    :host {
    display: block;
    }

    :host([hidden]) {
      display: none;
    }

    section {
      display: grid;
      grid-gap: 1rem;
      align-items: center;
      justify-items: center;
    }

    .game-chooser {
      grid-auto-rows: 4rem;
    }
    .game-chooser button {
      width: 100%;
      height: 80%;
    }

    .game-board {
      height: 96vh;
      grid-template-rows: 1fr 8fr 2fr;
      grid-template-areas: 'menu-area' 'question-area' 'answer-area';
    }
    .question-area {
      grid-area: question-area;
      background-color: grey;
      padding: 0.5rem;
    }
    .question-area img {
      width: 100%;
      height: 100%;
    }
    .btn {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
      width: 90%;
      height: 75%;
    }
    .answer-area {
      grid-area: answer-area;
      display: flex;
      align-items: center;
      justify-content: center;
      background: darkgreen;
      height: 100%;
      width: 100%;
    }

    .menu-area {
      grid-area: menu-area;
    }
    .nav {
      background: transparent;
      position: fixed;
      top: 1rem;
      right: 1rem;
    }
    .nav:hover {
      background: revert;
    }
    @media screen and (max-width: 425px), screen and (max-height: 425px) {
      .question-area {
        width: 20rem;
      }
    }`
  }
  
  render() {
    return html `${this.qstate ? html`
<section class="game-board">
  <div class="menu-area">
    <p>score: ${this.score}/${this.tries} time: ${this.timer}</p>
    <button class="nav" @click="${()=>this.qstate=!this.qstate}">Menu...</button>
  </div>
  
  <div class="question-area">
    <img src="https://res.cloudinary.com/amdtel/image/upload/game-assets/${this.game}/${this.correctAnswer.code}.svg"></img>
  </div>

${this.answer ? html`
  <div class="answer-area" @click="${this._pickRandomOption}">${this.outputMessage} Try another...</div>
` : html`
  <div class="answer-area">
    <button id="${this.optionA.code}" class="btn" @click="${this._selectAnswer}">${this.optionA.name}</button>
    <button id="${this.optionB.code}" class="btn" @click="${this._selectAnswer}">${this.optionB.name}</button>
  </div>

`}
</section>

` : html`
<button class="nav" onclick="location.href='/'" type="button">Exit...</button>
<section class="game-chooser">
  <div class="intro">Welcome to Whose Who!!! Pick a version to play...</div>
  <button id="world-flags" @click="${this.loadAssets}">Whose World Flag</button>
  <button id="us-state-flags" @click="${this.loadAssets}">Whose US State Flag</button>
  <button>Whose International Football Strip</button>
  <button>whose Premier League Football Strip</button>
  <button>Whose International Rugby Union Strip</button>
</section>

`}
`;
  }
  
  firstUpdated(){
    // this.loadAssets();

    // const myInput = this.shadowRoot.getElementById('myinput');
    // myInput.focus();
  }
  
  _pickRandomOption() {
    let optionA = {};
    let optionB = {};
    
    while(!optionA || !optionB || (optionA.code == optionB.code)) {
      optionA = this.gameAssets.assets[this._getRandomOption()];
      optionB = this.gameAssets.assets[this._getRandomOption()];
    }
    let coin = (Math.floor(Math.random() * 2));
    this.optionA = optionA;
    this.optionB = optionB;
    coin == 1 ? this.correctAnswer = optionA : this.correctAnswer = optionB;
    this.answer = false;
    this.startTimer = Date.now();
  }
  
  _getRandomOption() {
    return Math.floor(Math.random()* (this.gameAssets.assets.length));
  }
  
  _selectAnswer(e) {
    this.startTimer = Date.now() - this.startTimer;
    this.lapseTimer = this.lapseTimer + this.startTimer;
    this.timer = new Date(this.lapseTimer).toISOString().slice(11, -5);
    if (e.target.id == this.correctAnswer.code) {
      this.score = this.score+1;
      this.outputMessage = this.correctAnswer.name + ' is the correct answer...';
    } else {
      this.outputMessage = e.target.textContent + ' is the wrong answer...';
    }
    this.answer = true;
    this.tries = this.tries+1;
  }
  
  async loadAssets(e) {
    this.game = e.currentTarget.id;
    fetch('https://res.cloudinary.com/amdtel/raw/upload/game-assets/' + this.game + '/game-assets.json')
    .then(r => r.json())
    .then(data => {
      this.gameAssets = data;
      this._pickRandomOption();
      this.qstate = true;
    })
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('game-element', GameElement);
