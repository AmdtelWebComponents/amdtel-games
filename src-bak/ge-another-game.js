import { LitElement, css, html } from 'lit';

export class GameElement extends LitElement {
  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>
      <p>You picked AnotherGame.</p>
      <a href="/">Return</a>
    `;
  }
}
// Register the element with the browser
window.customElements.define('game-element', GameElement);
