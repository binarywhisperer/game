/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 134);
/******/ })
/************************************************************************/
/******/ ({

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
module.exports = __webpack_require__(148);


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.GameEvent = new (function () {
    function _class() {
        _classCallCheck(this, _class);

        this.vue = new Vue();
    }

    _createClass(_class, [{
        key: 'fire',
        value: function fire(event) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.vue.$emit(event, data);
        }
    }, {
        key: 'listen',
        value: function listen(event, callback) {
            this.vue.$on(event, callback);
        }
    }]);

    return _class;
}())();

Vue.component('board', __webpack_require__(136));
Vue.component('description', __webpack_require__(139));
Vue.component('instance-selects', __webpack_require__(3));
Vue.component('general-chat', __webpack_require__(142));
Vue.component('svg-arrows', __webpack_require__(145));

var game = new Vue({
    el: '#game',
    data: {
        currentInstance: { "users": [{ "id": "gamer" }, { "id": 0, "primaryColor": '#870000', "secondaryColor": '#190A05', 'name': 'Local A.I.' }], "edges": [] },
        instances: instances,
        gamer: gamer
    },
    methods: {
        createGame: function createGame() {},
        hasPlayerEdge: function hasPlayerEdge(vert) {
            var edge = this.hasEdge(0, vert);
            if (edge != false) {
                return this.currentInstance.vertices.players[edge[0]];
            }
            edge = this.hasEdge(1, vert);
            if (edge != false) {
                return this.currentInstance.vertices.players[edge[0]];
            }
            return '';
        },
        addEdge: function addEdge(vert1, vert2) {
            this.currentInstance.edges.unshift([vert1, vert2]);
        },
        hasEdge: function hasEdge(vert1, vert2) {
            var result = false;
            var edges = this.currentInstance.edges;
            _.forEach(edges, function (edge) {
                if (edge[0] == vert1 && edge[1] == vert2 || edge[0] == vert2 && edge[1] == vert1) {
                    result = edge;
                    return;
                }
            });
            return result;
        },
        locationSelected: function locationSelected(location) {
            this.addEdge(this.currentInstance.edges.length % 2, location);
        },
        instanceSelected: function instanceSelected(instance) {
            this.currentInstance.edges = JSON.parse(instance.edges);
            this.currentInstance.users = instance.users;
            window.scrollTo(0, 0);
            _.forEach(document.getElementsByClassName('board-load'), function (animation) {
                animation.beginElement();
            });
        }
    },
    created: function created() {
        var _this = this;

        GameEvent.listen('locationSelected', function (location) {
            return _this.locationSelected(location);
        });
        GameEvent.listen('instanceSelected', function (instance) {
            return _this.instanceSelected(instance);
        });
    },
    mounted: function mounted() {
        console.log("Tic Tac Toe Board Loaded:");
        console.log(this.currentInstance);
    }
});

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(137)
/* template */
var __vue_template__ = __webpack_require__(138)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\tictactoe\\Board.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bb45336", Component.options)
  } else {
    hotAPI.reload("data-v-0bb45336", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['segments', 'instance', 'gamer'],
    data: function data() {
        return {
            range: _.range(0, this.segments * this.segments, 1),
            size: 300,
            grid: 100,
            offset: 0
        };
    },
    methods: {
        rectClicked: function rectClicked(id) {
            GameEvent.fire('locationSelected', id);
        },
        setSize: function setSize() {
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight || e.clientHeight || g.clientHeight;
            this.size = (x < y ? x : y) - 125;
            this.offset = (x - this.size) / 2;
            this.grid = this.size / this.segments;
            document.getElementsByClassName('the-grid')[0].style.margin = "0 " + this.offset + 'px';
        }
    },
    computed: {
        playerXName: function playerXName() {
            return this.instance.users[0].id == 'gamer' ? this.gamer.name : this.instance.users[0].name;
        },
        playerOName: function playerOName() {
            return this.instance.users[1].id == 'gamer' ? this.gamer.name : this.instance.users[1].name;
        },
        playerXPrimary: function playerXPrimary() {
            return this.instance.users[0].id == 'gamer' ? this.gamer.primaryColor : this.instance.users[0].primaryColor;
        },
        playerXSecondary: function playerXSecondary() {
            return this.instance.users[0].id == 'gamer' ? this.gamer.secondaryColor : this.instance.users[0].secondaryColor;
        },
        playerOPrimary: function playerOPrimary() {
            return this.instance.users[1].id == 'gamer' ? this.gamer.primaryColor : this.instance.users[1].primaryColor;
        },
        playerOSecondary: function playerOSecondary() {
            return this.instance.users[1].id == 'gamer' ? this.gamer.secondaryColor : this.instance.users[1].secondaryColor;
        },
        playerExEdges: function playerExEdges() {
            return _.filter(this.instance.edges, function (edge) {
                return edge[0] == 0;
            });
        },
        playerCircleEdges: function playerCircleEdges() {
            return _.filter(this.instance.edges, function (edge) {
                return edge[0] == 1;
            });
        }
    },
    mounted: function mounted() {
        this.setSize();
        window.addEventListener('resize', this.setSize);
    },
    beforeDestroy: function beforeDestroy() {
        window.removeEventListener('resize', this.setSize);
    }
});

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "svg",
    {
      staticClass: "the-grid",
      attrs: { height: _vm.size + 85, width: _vm.size }
    },
    [
      _vm._l(_vm.range, function(i) {
        return _c("rect", {
          attrs: {
            id: i,
            x: (i % _vm.segments) * _vm.grid,
            y: Math.floor(i / _vm.segments) * _vm.grid,
            width: _vm.grid,
            height: _vm.grid,
            fill: "#fff"
          },
          on: {
            click: function($event) {
              _vm.rectClicked(i + 2)
            }
          }
        })
      }),
      _vm._v(" "),
      _vm._l(_vm.segments - 1, function(l1) {
        return _c("line", {
          staticClass: "the-grid-line",
          attrs: {
            x1: _vm.grid * l1 - 2,
            y1: "0",
            x2: _vm.grid * l1 - 2,
            y2: _vm.size - 2,
            "stroke-width": "5",
            stroke: "black"
          }
        })
      }),
      _vm._v(" "),
      _vm._l(_vm.segments - 1, function(l2) {
        return _c("line", {
          staticClass: "the-grid-line",
          attrs: {
            x1: "0",
            y1: _vm.grid * l2 - 2,
            x2: _vm.size - 2,
            y2: _vm.grid * l2 - 2,
            "stroke-width": "5",
            stroke: "black"
          }
        })
      }),
      _vm._v(" "),
      _vm._l(_vm.playerCircleEdges, function(edge) {
        return _c("circle", {
          attrs: {
            cx: ((edge[1] - 2) % _vm.segments) * _vm.grid + _vm.grid / 2,
            cy:
              Math.floor((edge[1] - 2) / _vm.segments) * _vm.grid +
              _vm.grid / 2,
            r: _vm.grid / 2 - 3,
            stroke: _vm.playerOPrimary,
            "stroke-width": "5",
            "fill-opacity": "0"
          }
        })
      }),
      _vm._v(" "),
      _vm._l(_vm.playerExEdges, function(edge) {
        return _c("line", {
          attrs: {
            x1: ((edge[1] - 2) % _vm.segments) * _vm.grid + 3,
            y1: Math.floor((edge[1] - 2) / _vm.segments) * _vm.grid + 3,
            x2: ((edge[1] - 2) % _vm.segments) * _vm.grid + _vm.grid - 3,
            y2:
              Math.floor((edge[1] - 2) / _vm.segments) * _vm.grid +
              _vm.grid -
              5,
            "stroke-width": "5",
            stroke: _vm.playerXPrimary
          }
        })
      }),
      _vm._v(" "),
      _vm._l(_vm.playerExEdges, function(edge) {
        return _c("line", {
          attrs: {
            x1: ((edge[1] - 2) % _vm.segments) * _vm.grid + _vm.grid - 3,
            y1: Math.floor((edge[1] - 2) / _vm.segments) * _vm.grid + 3,
            x2: ((edge[1] - 2) % _vm.segments) * _vm.grid + 3,
            y2:
              Math.floor((edge[1] - 2) / _vm.segments) * _vm.grid +
              _vm.grid -
              3,
            "stroke-width": "5",
            stroke: _vm.playerXPrimary
          }
        })
      }),
      _vm._v(" "),
      _c(
        "rect",
        {
          attrs: {
            x: 5,
            y: _vm.size + 5,
            width: _vm.grid * 1.25 - 10,
            height: 50,
            fill: _vm.playerXPrimary,
            "stroke-width": "5",
            stroke: _vm.playerXSecondary,
            rx: "4",
            ry: "4"
          }
        },
        [
          _c("animate", {
            staticClass: "board-load",
            attrs: {
              attributeName: "y",
              dur: ".75s",
              from: 0,
              to: _vm.size + 5
            }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "rect",
        {
          attrs: {
            x: 8,
            y: _vm.size + 8,
            width: _vm.grid * 1.25 - 16,
            height: 44,
            fill: "none",
            "stroke-width": "3",
            stroke: "rgba(0,0,0,.5)",
            rx: "4",
            ry: "4"
          }
        },
        [
          _c("animate", {
            staticClass: "board-load",
            attrs: {
              attributeName: "y",
              dur: ".75s",
              from: 0,
              to: _vm.size + 8
            }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "text",
        {
          staticStyle: {
            stroke: "#000",
            "font-size": "24px",
            "font-weight": "700",
            fill: "#fff"
          },
          attrs: { x: 5 + 10, y: _vm.size + 40 }
        },
        [
          _vm._v(_vm._s(_vm.playerXName) + "\n                  "),
          _c("animate", {
            staticClass: "board-load",
            attrs: {
              attributeName: "y",
              dur: ".75s",
              from: 0,
              to: _vm.size + 40
            }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "text",
        {
          staticStyle: {
            stroke: "#000",
            "font-size": "32px",
            "font-weight": "700",
            fill: "#fff"
          },
          attrs: { x: 5 + _vm.grid * 1.4, y: _vm.size + 40 }
        },
        [_vm._v("VS\n                      ")]
      ),
      _vm._v(" "),
      _c(
        "rect",
        {
          attrs: {
            x: 5 + _vm.grid * 1.75,
            y: _vm.size + 5,
            width: _vm.grid * 1.25 - 10,
            height: 50,
            fill: _vm.playerOPrimary,
            "stroke-width": "5",
            stroke: _vm.playerOSecondary,
            rx: "4",
            ry: "4"
          }
        },
        [
          _c("animate", {
            staticClass: "board-load",
            attrs: {
              attributeName: "y",
              dur: ".75s",
              from: 0,
              to: _vm.size + 5
            }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "rect",
        {
          attrs: {
            x: 8 + _vm.grid * 1.75,
            y: _vm.size + 8,
            width: _vm.grid * 1.25 - 16,
            height: 44,
            fill: "none",
            "stroke-width": "3",
            stroke: "rgba(0,0,0,.5)",
            rx: "4",
            ry: "4"
          }
        },
        [
          _c("animate", {
            staticClass: "board-load",
            attrs: {
              attributeName: "y",
              dur: ".75s",
              from: 0,
              to: _vm.size + 8
            }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "text",
        {
          staticStyle: {
            stroke: "#000",
            "font-size": "24px",
            "font-weight": "700",
            fill: "#fff"
          },
          attrs: { x: 5 + _vm.grid * 1.75 + 10, y: _vm.size + 40 }
        },
        [
          _vm._v(_vm._s(_vm.playerOName) + "\n                  "),
          _c("animate", {
            staticClass: "board-load",
            attrs: {
              attributeName: "y",
              dur: ".75s",
              from: 0,
              to: _vm.size + 40
            }
          })
        ]
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0bb45336", module.exports)
  }
}

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(140)
/* template */
var __vue_template__ = __webpack_require__(141)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\tictactoe\\Description.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8e8fb18a", Component.options)
  } else {
    hotAPI.reload("data-v-8e8fb18a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['segments', 'board'],
    data: function data() {
        return {};
    },
    methods: {},
    computed: {},
    mounted: function mounted() {}
});

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("h1", [_vm._v("Tic Tac Toe")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game."
        )
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8e8fb18a", module.exports)
  }
}

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(143)
/* template */
var __vue_template__ = __webpack_require__(144)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\master\\GeneralChat.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ee419346", Component.options)
  } else {
    hotAPI.reload("data-v-ee419346", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
            messages: []
        };
    },
    methods: {
        messageSent: function messageSent(message) {
            this.messages.push(message);
        },
        sendMessage: function sendMessage(message) {
            axios.post('/messenger', { message: message.target.message.value }).then(function (response) {
                message.target.message.value = "";
            });
        }
    },
    mounted: function mounted() {
        var vm = this;
        socket.on('general:App\\Events\\MessageSent', function (data) {
            vm.messageSent(data.message);
        });
    }
});

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "general-chat" } }, [
    _c("h2", [_vm._v("General Chat")]),
    _vm._v(" "),
    _c(
      "ul",
      [
        _c("li", [_vm._v(_vm._s(_vm.time))]),
        _vm._v(" "),
        _vm._l(_vm.messages, function(message) {
          return _c("li", [
            _c(
              "div",
              {
                style: {
                  background: message.primary,
                  borderColor: message.secondary
                }
              },
              [_vm._v(_vm._s(message.name))]
            ),
            _vm._v(_vm._s(message.message))
          ])
        })
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "form",
      {
        attrs: { id: "general-chatbox" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            _vm.sendMessage($event)
          }
        }
      },
      [_vm._m(0)]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "field has-addons" }, [
      _c("p", { staticClass: "control is-expanded" }, [
        _c("input", {
          staticClass: "input",
          attrs: {
            type: "text",
            autocomplete: "off",
            name: "message",
            placeholder: "Be nice or GTFO"
          }
        })
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "control" }, [
        _c(
          "button",
          { staticClass: "button is-primary", attrs: { type: "submit" } },
          [_vm._v("\n                    SEND\n                ")]
        )
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ee419346", module.exports)
  }
}

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(146)
/* template */
var __vue_template__ = __webpack_require__(147)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\master\\SVGBackground.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-369f4b22", Component.options)
  } else {
    hotAPI.reload("data-v-369f4b22", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['width', 'instances', 'frequency'],
    data: function data() {
        return {
            size: 50,
            offset: 15,
            freq: this.frequency,
            height: this.instances.length * 64
        };
    },
    methods: {
        pointsFrom: function pointsFrom(arrows) {
            return 0 - arrows[3] * this.offset - arrows[1] + "," + arrows[2] + " " + (this.size - arrows[3] * this.offset - arrows[1]) + "," + (arrows[2] + this.size) + " " + (0 - arrows[3] * this.offset - arrows[1]) + "," + (arrows[2] + this.size * 2);
        },
        pointsTo: function pointsTo(arrows) {
            return this.width - arrows[3] * this.offset + "," + arrows[2] + " " + (this.width + this.size - arrows[3] * this.offset) + "," + (arrows[2] + this.size) + " " + (this.width - arrows[3] * this.offset) + "," + (arrows[2] + this.size * 2);
        },
        rando: function rando(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    computed: {
        arrows: function arrows() {
            var arrowSet = [];
            for (var i = 0; i <= this.freq; i++) {
                var speed = this.rando(1, 15) * .2 + .3;
                var offsetX = this.rando(1, 100) / 100 * this.size - this.size * 2;
                var offsetY = this.rando(0, 100) / 100 * this.height;
                var length = this.rando(1, 10);
                for (var j = 0; j <= length; j++) {
                    arrowSet.push([speed, offsetX, offsetY, j]);
                }
            }
            return arrowSet;
        }
    },
    mounted: function mounted() {
        var vm = this;
        setInterval(function () {
            vm.freq += Math.pow(-1, vm.freq % 1);
        }, 6000);
    }
});

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "svg",
    {
      staticClass: "ghost",
      attrs: { height: _vm.height, width: _vm.width, id: "svg-arrows" }
    },
    [
      _c(
        "linearGradient",
        { attrs: { id: "g", x2: "1", y2: "1" } },
        [
          _c("stop", { attrs: { "stop-color": "#bdfff3" } }),
          _vm._v(" "),
          _c("stop", { attrs: { offset: "100%", "stop-color": "#4ac29a" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("rect", { attrs: { width: "100%", height: "100%", fill: "url(#g)" } }),
      _vm._v(" "),
      _vm._l(_vm.arrows, function(arrow) {
        return _c(
          "polyline",
          {
            staticClass: "polyline",
            attrs: {
              test: arrow,
              fill: "none",
              stroke: "#fff",
              "stroke-width": "6"
            }
          },
          [
            _c("animate", {
              attrs: {
                attributeName: "points",
                dur: arrow[0] + "s",
                from: _vm.pointsFrom(arrow),
                to: _vm.pointsTo(arrow),
                restart: "whenNotActive",
                repeatCount: "indefinite"
              }
            }),
            _vm._v(" "),
            _c("animate", {
              attrs: {
                attributeName: "opacity",
                dur: "6s",
                from: 1,
                to: 0,
                repeatCount: "indefinite"
              }
            })
          ]
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-369f4b22", module.exports)
  }
}

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\tictactoe\\Instance.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f3f0134", Component.options)
  } else {
    hotAPI.reload("data-v-5f3f0134", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['instance', 'gamer'],
    data: function data() {
        return {
            turn: _.size(JSON.parse(this.instance.edges)) + 1,
            last_at: moment(this.instance.updated_at.date)
        };
    },
    methods: {
        playerIcon: function playerIcon(player) {
            if (this.instance.users[0].id == player) {
                return 'X';
            }
            return 'O';
        },
        selectInstance: function selectInstance() {
            GameEvent.fire('instanceSelected', this.instance);
        }
    },
    computed: {
        opponents: function opponents() {
            var gamer = this.gamer.id;
            return _.filter(this.instance.users, function (user) {
                return user.id != gamer;
            });
        }
    },
    mounted: function mounted() {}
});

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "instance-select", on: { click: _vm.selectInstance } },
    [
      _c("div", { staticClass: "instance-label" }, [
        _c("div", { staticClass: "label-type" }, [
          _vm._v(_vm._s(_vm.playerIcon(_vm.gamer.id)))
        ]),
        _c(
          "div",
          {
            staticClass: "label-data label-gamer",
            style: {
              background: _vm.gamer.primaryColor,
              borderColor: _vm.gamer.secondaryColor
            }
          },
          [_vm._v(_vm._s(_vm.gamer.name))]
        )
      ]),
      _vm._v(" "),
      _vm._l(_vm.opponents, function(opponent) {
        return _c(
          "div",
          {
            key: opponent.id,
            staticClass: "instance-label",
            attrs: { opponent: opponent }
          },
          [
            _c("div", { staticClass: "label-type" }, [
              _vm._v(_vm._s(_vm.playerIcon(opponent.id)))
            ]),
            _c(
              "div",
              {
                staticClass: "label-data label-gamer",
                style: {
                  background: opponent.primaryColor,
                  borderColor: opponent.secondaryColor
                }
              },
              [_vm._v(_vm._s(opponent.name))]
            )
          ]
        )
      }),
      _vm._v(" "),
      _c("div", { staticClass: "instance-label" }, [
        _vm._m(0),
        _c("div", { staticClass: "label-data label-last" }, [
          _vm._v(_vm._s(_vm.last_at.format("MMM Do"))),
          _c("br"),
          _vm._v(_vm._s(_vm.last_at.format("h:mm:ssA")))
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "instance-label" }, [
        _vm._m(1),
        _c("div", { staticClass: "label-data" }, [_vm._v(_vm._s(_vm.turn))])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "instance-label" }, [
        _c("div", { staticClass: "label-type" }, [_vm._v("#")]),
        _c("div", { staticClass: "label-data" }, [
          _vm._v(_vm._s(_vm.instance.id))
        ])
      ])
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "label-type" }, [
      _c("i", { staticClass: "fa fa-clock-o" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "label-type" }, [
      _c("i", { staticClass: "fa fa-refresh" })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5f3f0134", module.exports)
  }
}

/***/ })

/******/ });