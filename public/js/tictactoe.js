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
module.exports = __webpack_require__(145);


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var game = new Vue({
    el: '#game',
    data: {
        currentInstance: _defineProperty({ "id": 0, "users": [{ "id": "gamer" }, { "id": 0, "primaryColor": '#870000', "secondaryColor": '#190A05', 'name': 'Local A.I.' }], "edges": [] }, 'edges', []),
        instances: instances,
        gamer: gamer
    },
    methods: {
        createGame: function createGame() {},
        hasPlayerEdge: function hasPlayerEdge(vert) {
            var edge = this.hasEdge(0, vert);
            if (edge != false) {
                return true;
            }
            edge = this.hasEdge(1, vert);
            if (edge != false) {
                return true;
            }
            return false;
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
            console.log('this.currentInstance');
            console.log(this.currentInstance);
            if (this.currentInstance.id == 0) {
                if (!this.hasPlayerEdge(location)) {
                    this.addEdge(0, location);
                    var randomStrat = 2;
                    if (this.currentInstance.edges.length < 9) {
                        do {
                            randomStrat = Math.floor(Math.random() * 8) + 2;
                        } while (this.hasPlayerEdge(randomStrat));
                        var vm = this;
                        setTimeout(function () {
                            vm.addEdge(1, randomStrat);
                        }, 100);
                    }
                }
            } else {
                axios.post('api/instance/' + this.currentInstance.id, { action: 'add', edge: [this.gamer.id, location] }).then(function (response) {});
            }
        },
        instanceWin: function instanceWin(message) {
            alert(message.message);
        },
        instanceUpdated: function instanceUpdated(instance) {
            this.currentInstance.edges = JSON.parse(instance.edges);
        },
        instanceSelected: function instanceSelected(instance) {
            this.currentInstance.id = instance.id;
            this.currentInstance.edges = JSON.parse(instance.edges);
            this.currentInstance.users = instance.users;
            window.scrollTo(0, 0);
            document.getElementById('nav').className = 'animated bounceOutUp';
            setTimeout(function () {
                _.forEach(document.getElementsByClassName('board-load'), function (animation) {
                    animation.beginElement();
                });
            }, 400);
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
        GameEvent.listen('instanceUpdated', function (instance) {
            return _this.instanceUpdated(instance);
        });
        GameEvent.listen('instanceWin', function (message) {
            return _this.instanceWin(message);
        });
    },
    mounted: function mounted() {}
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
Component.options.__file = "resources/assets/js/components/tictactoe/Board.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e220932", Component.options)
  } else {
    hotAPI.reload("data-v-2e220932", Component.options)
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
            offset: 0,
            localInstance: this.instance
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
        },
        instanceUpdated: function instanceUpdated(instance) {
            console.log('instanceUpdated');
            console.log(this.localInstance);
            this.localInstance.edges = instance.edges;
            console.log(this.localInstance);
        }
    },
    computed: {
        playerXName: function playerXName() {
            return this.localInstance.users[0].id == 'gamer' ? this.gamer.name : this.localInstance.users[0].name;
        },
        playerOName: function playerOName() {
            return this.localInstance.users[1].id == 'gamer' ? this.gamer.name : this.localInstance.users[1].name;
        },
        playerXPrimary: function playerXPrimary() {
            return this.localInstance.users[0].id == 'gamer' ? this.gamer.primaryColor : this.localInstance.users[0].primaryColor;
        },
        playerXSecondary: function playerXSecondary() {
            return this.localInstance.users[0].id == 'gamer' ? this.gamer.secondaryColor : this.localInstance.users[0].secondaryColor;
        },
        playerOPrimary: function playerOPrimary() {
            return this.localInstance.users[1].id == 'gamer' ? this.gamer.primaryColor : this.localInstance.users[1].primaryColor;
        },
        playerOSecondary: function playerOSecondary() {
            return this.localInstance.users[1].id == 'gamer' ? this.gamer.secondaryColor : this.localInstance.users[1].secondaryColor;
        },
        playerExEdges: function playerExEdges() {
            return _.filter(this.localInstance.edges, function (edge) {
                return edge[0] == 0;
            });
        },
        playerCircleEdges: function playerCircleEdges() {
            return _.filter(this.localInstance.edges, function (edge) {
                return edge[0] == 1;
            });
        }
    },
    mounted: function mounted() {
        this.setSize();
        window.addEventListener('resize', this.setSize);
    },
    created: function created() {
        var _this = this;

        GameEvent.listen('instanceUpdated', function (instance) {
            return _this.instanceUpdated(instance);
        });
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
    require("vue-hot-reload-api")      .rerender("data-v-2e220932", module.exports)
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
Component.options.__file = "resources/assets/js/components/tictactoe/Description.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53a44c48", Component.options)
  } else {
    hotAPI.reload("data-v-53a44c48", Component.options)
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
    require("vue-hot-reload-api")      .rerender("data-v-53a44c48", module.exports)
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
Component.options.__file = "resources/assets/js/components/master/GeneralChat.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60df18ea", Component.options)
  } else {
    hotAPI.reload("data-v-60df18ea", Component.options)
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
            this.messages.unshift(message);
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
    require("vue-hot-reload-api")      .rerender("data-v-60df18ea", module.exports)
  }
}

/***/ }),

/***/ 145:
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
Component.options.__file = "resources/assets/js/components/tictactoe/Instance.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61fc3d79", Component.options)
  } else {
    hotAPI.reload("data-v-61fc3d79", Component.options)
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
    require("vue-hot-reload-api")      .rerender("data-v-61fc3d79", module.exports)
  }
}

/***/ })

/******/ });