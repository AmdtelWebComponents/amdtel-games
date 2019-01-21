define(["exports", "./game-app.js"], function (_exports, _gameApp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.GameElement = _exports.$geAnotherGame = void 0;

  function _templateObject_9b3015c01d5b11e9aae6cf7febf55297() {
    var data = babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host { display: block; }\n        :host([hidden]) { display: none; }\n      </style>\n      <p>You picked AnotherGame.</p>\n      <a href=\"/\">Return</a>\n    "]);

    _templateObject_9b3015c01d5b11e9aae6cf7febf55297 = function _templateObject_9b3015c01d5b11e9aae6cf7febf55297() {
      return data;
    };

    return data;
  }

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
  var GameElement =
  /*#__PURE__*/
  function (_LitElement) {
    babelHelpers.inherits(GameElement, _LitElement);

    function GameElement() {
      babelHelpers.classCallCheck(this, GameElement);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(GameElement).apply(this, arguments));
    }

    babelHelpers.createClass(GameElement, [{
      key: "render",

      /**
       * Define a template for the new element by implementing LitElement's
       * `render` function. `render` must return a lit-html TemplateResult.
       */
      value: function render() {
        return (0, _gameApp.html)(_templateObject_9b3015c01d5b11e9aae6cf7febf55297());
      }
    }]);
    return GameElement;
  }(_gameApp.LitElement); // Register the element with the browser


  _exports.GameElement = GameElement;
  customElements.define('game-element', GameElement);
  var geAnotherGame = {
    GameElement: GameElement
  };
  _exports.$geAnotherGame = geAnotherGame;
});