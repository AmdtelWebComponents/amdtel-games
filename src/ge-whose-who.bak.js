/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

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
    // Must call superconstructor first.
    super();

    // Initialize properties
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
  
  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html `
${this.qstate ? html`

<style>
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  section {
    height: 96vh;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-areas: 'menu-area' 'question-area' 'answer-area';
    align-items: center;
    justify-items: center;
  }
  .question-area {
    grid-area: question-area;
    width: 32rem;
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
    background: lightgreen;
    height: 100%;
    width: 100%;
  }

  .menu-area {
    grid-area: menu-area;
  }
  .nav {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
  @media screen and (max-width: 425px), screen and (max-height: 425px) {
    .question-area {
      width: 20rem;
    }
  }
</style>

<section>
  <div class="menu-area">
    <p>score: ${this.score}/${this.tries} time: ${this.timer}</p>
    <div class="nav" @click="${()=>this.qstate=!this.qstate}">Menu...</div>
  </div>
  
  <div class="question-area">
    <img src="https://res.cloudinary.com/amdtel/image/upload/game-assets/World-flags/${this.correctAnswer.code}.svg"></img>
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
<style>
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  section {
    display: grid;
    grid-gap: 1rem;
    grid-auto-rows: 4rem;
    align-items: center;
    justify-items: center;
  }
  
  section div {
    display: flex;
    width: 100%;
    height: 100%;
    background: lightgrey;
    justify-content: center;
    align-items: center;
  }
  
  .intro {
    background: black;
    color: white;
  }
  
  .nav {
    background: grey;
    color: white;
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
</style>

<a class="nav" href="/">Exit...</a>
<section>
  <div class="intro">Welcome to Whose Who!!! Pick a version to play...</div>
  <div id="world-flags" @click="${this.loadAssets}">Whose World Flag</div>
  <div id="state-flags" @click="${this.loadAssets}">Whose US State Flag</div>
  <div>Whose International Football Strip</div>
  <div>whose Premier League Football Strip</div>
  <div>Whose International Rugby Union Strip</div>
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
    this.game = e.path[0].id;
    fetch('https://res.cloudinary.com/amdtel/raw/upload/game-assets/' + this.game + '/game-assets.json')
    .then(r => r.json())
    .then(data => {
      this.gameAssets = data;
      this._pickRandomOption();
      this.qstate = true;
      console.log(e);
    })
    .catch(e => console.log("fetch error:", e));
  }
}
// Register the element with the browser
customElements.define('game-element', GameElement);
