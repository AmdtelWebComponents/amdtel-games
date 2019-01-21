define(["exports", "./game-app.js"], function (_exports, _gameApp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.GameElement = _exports.$geWhoseWho = void 0;

  function _templateObject5_9b2e19f01d5b11e9aae6cf7febf55297() {
    var data = babelHelpers.taggedTemplateLiteral(["\n<style>\n  :host {\n    display: block;\n  }\n\n  :host([hidden]) {\n    display: none;\n  }\n\n  section {\n    display: grid;\n    grid-gap: 1rem;\n    grid-auto-rows: 4rem;\n    align-items: center;\n    justify-items: center;\n  }\n  \n  section div {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    background: lightgrey;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  .intro {\n    background: black;\n    color: white;\n  }\n  \n  .nav {\n    background: grey;\n    color: white;\n    position: fixed;\n    top: 1rem;\n    right: 1rem;\n  }\n</style>\n\n<a class=\"nav\" href=\"/\">Exit...</a>\n<section>\n  <div class=\"intro\">Welcome to Whose Who!!! Pick a version to play...</div>\n  <div id=\"world-flags\" @click=\"", "\">Whose World Flag</div>\n  <div id=\"us-state-flags\" @click=\"", "\">Whose US State Flag</div>\n  <div>Whose International Football Strip</div>\n  <div>whose Premier League Football Strip</div>\n  <div>Whose International Rugby Union Strip</div>\n</section>\n\n"]);

    _templateObject5_9b2e19f01d5b11e9aae6cf7febf55297 = function _templateObject5_9b2e19f01d5b11e9aae6cf7febf55297() {
      return data;
    };

    return data;
  }

  function _templateObject4_9b2e19f01d5b11e9aae6cf7febf55297() {
    var data = babelHelpers.taggedTemplateLiteral(["\n  <div class=\"answer-area\">\n    <button id=\"", "\" class=\"btn\" @click=\"", "\">", "</button>\n    <button id=\"", "\" class=\"btn\" @click=\"", "\">", "</button>\n  </div>\n\n"]);

    _templateObject4_9b2e19f01d5b11e9aae6cf7febf55297 = function _templateObject4_9b2e19f01d5b11e9aae6cf7febf55297() {
      return data;
    };

    return data;
  }

  function _templateObject3_9b2e19f01d5b11e9aae6cf7febf55297() {
    var data = babelHelpers.taggedTemplateLiteral(["\n  <div class=\"answer-area\" @click=\"", "\">", " Try another...</div>\n"]);

    _templateObject3_9b2e19f01d5b11e9aae6cf7febf55297 = function _templateObject3_9b2e19f01d5b11e9aae6cf7febf55297() {
      return data;
    };

    return data;
  }

  function _templateObject2_9b2e19f01d5b11e9aae6cf7febf55297() {
    var data = babelHelpers.taggedTemplateLiteral(["\n\n<style>\n  :host {\n    display: block;\n  }\n\n  :host([hidden]) {\n    display: none;\n  }\n\n  section {\n    height: 96vh;\n    display: grid;\n    grid-gap: 1rem;\n    grid-template-columns: 1fr;\n    grid-template-areas: 'menu-area' 'question-area' 'answer-area';\n    align-items: center;\n    justify-items: center;\n  }\n  .question-area {\n    grid-area: question-area;\n    width: 32rem;\n    background-color: grey;\n    padding: 0.5rem;\n  }\n  .question-area img {\n    width: 100%;\n    height: 100%;\n  }\n  .btn {\n    margin-left: 0.25rem;\n    margin-right: 0.25rem;\n    width: 90%;\n    height: 75%;\n  }\n  .answer-area {\n    grid-area: answer-area;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: lightgreen;\n    height: 100%;\n    width: 100%;\n  }\n\n  .menu-area {\n    grid-area: menu-area;\n  }\n  .nav {\n    position: fixed;\n    top: 1rem;\n    right: 1rem;\n  }\n  @media screen and (max-width: 425px), screen and (max-height: 425px) {\n    .question-area {\n      width: 20rem;\n    }\n  }\n</style>\n\n<section>\n  <div class=\"menu-area\">\n    <p>score: ", "/", " time: ", "</p>\n    <div class=\"nav\" @click=\"", "\">Menu...</div>\n  </div>\n  \n  <div class=\"question-area\">\n    <img src=\"https://res.cloudinary.com/amdtel/image/upload/game-assets/", "/", ".svg\"></img>\n  </div>\n\n", "\n</section>\n\n"]);

    _templateObject2_9b2e19f01d5b11e9aae6cf7febf55297 = function _templateObject2_9b2e19f01d5b11e9aae6cf7febf55297() {
      return data;
    };

    return data;
  }

  function _templateObject_9b2e19f01d5b11e9aae6cf7febf55297() {
    var data = babelHelpers.taggedTemplateLiteral(["\n", "\n"]);

    _templateObject_9b2e19f01d5b11e9aae6cf7febf55297 = function _templateObject_9b2e19f01d5b11e9aae6cf7febf55297() {
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
    babelHelpers.createClass(GameElement, null, [{
      key: "properties",
      get: function get() {
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
    }]);

    function GameElement() {
      var _this;

      babelHelpers.classCallCheck(this, GameElement);
      // Must call superconstructor first.
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(GameElement).call(this)); // Initialize properties

      _this.outputMessage = 'Welcome to Whose flag is it';
      _this.score = 0;
      _this.tries = 0;
      _this.qstate = false;
      _this.answer = false;
      _this.timer = 0;
      _this.startTimer = 0;
      _this.lapseTimer = 0;
      _this.game = '';
      return _this;
    }
    /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */


    babelHelpers.createClass(GameElement, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return (0, _gameApp.html)(_templateObject_9b2e19f01d5b11e9aae6cf7febf55297(), this.qstate ? (0, _gameApp.html)(_templateObject2_9b2e19f01d5b11e9aae6cf7febf55297(), this.score, this.tries, this.timer, function () {
          return _this2.qstate = !_this2.qstate;
        }, this.game, this.correctAnswer.code, this.answer ? (0, _gameApp.html)(_templateObject3_9b2e19f01d5b11e9aae6cf7febf55297(), this._pickRandomOption, this.outputMessage) : (0, _gameApp.html)(_templateObject4_9b2e19f01d5b11e9aae6cf7febf55297(), this.optionA.code, this._selectAnswer, this.optionA.name, this.optionB.code, this._selectAnswer, this.optionB.name)) : (0, _gameApp.html)(_templateObject5_9b2e19f01d5b11e9aae6cf7febf55297(), this.loadAssets, this.loadAssets));
      }
    }, {
      key: "firstUpdated",
      value: function firstUpdated() {// this.loadAssets();
        // const myInput = this.shadowRoot.getElementById('myinput');
        // myInput.focus();
      }
    }, {
      key: "_pickRandomOption",
      value: function _pickRandomOption() {
        var optionA = {};
        var optionB = {};

        while (!optionA || !optionB || optionA.code == optionB.code) {
          optionA = this.gameAssets.assets[this._getRandomOption()];
          optionB = this.gameAssets.assets[this._getRandomOption()];
        }

        var coin = Math.floor(Math.random() * 2);
        this.optionA = optionA;
        this.optionB = optionB;
        coin == 1 ? this.correctAnswer = optionA : this.correctAnswer = optionB;
        this.answer = false;
        this.startTimer = Date.now();
      }
    }, {
      key: "_getRandomOption",
      value: function _getRandomOption() {
        return Math.floor(Math.random() * this.gameAssets.assets.length);
      }
    }, {
      key: "_selectAnswer",
      value: function _selectAnswer(e) {
        this.startTimer = Date.now() - this.startTimer;
        this.lapseTimer = this.lapseTimer + this.startTimer;
        this.timer = new Date(this.lapseTimer).toISOString().slice(11, -5);

        if (e.target.id == this.correctAnswer.code) {
          this.score = this.score + 1;
          this.outputMessage = this.correctAnswer.name + ' is the correct answer...';
        } else {
          this.outputMessage = e.target.textContent + ' is the wrong answer...';
        }

        this.answer = true;
        this.tries = this.tries + 1;
      }
    }, {
      key: "loadAssets",
      value: function () {
        var _loadAssets = babelHelpers.asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(e) {
          var _this3 = this;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.game = e.path[0].id;
                  fetch('https://res.cloudinary.com/amdtel/raw/upload/game-assets/' + this.game + '/game-assets.json').then(function (r) {
                    return r.json();
                  }).then(function (data) {
                    _this3.gameAssets = data;

                    _this3._pickRandomOption();

                    _this3.qstate = true;
                    console.log(e);
                  }).catch(function (e) {
                    return console.log("fetch error:", e);
                  });

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function loadAssets(_x) {
          return _loadAssets.apply(this, arguments);
        }

        return loadAssets;
      }()
    }]);
    return GameElement;
  }(_gameApp.LitElement); // Register the element with the browser


  _exports.GameElement = GameElement;
  customElements.define('game-element', GameElement);
  var geWhoseWho = {
    GameElement: GameElement
  };
  _exports.$geWhoseWho = geWhoseWho;
});