require('./../../runtime.js');
(my["webpackChunk"] = my["webpackChunk"] || []).push([["12"], {
5296: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin


}),
7127: (function (module) {
module.exports = 'module-a';


}),
2100: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('esmodule');


}),
9762: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _esmodule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2100);


exports.__esModule = true;
exports.default = fmtEvent;
function fmtEvent(props, e) {
    var dataset = {};
    for(var key in props){
        if (/data-/gi.test(key)) {
            dataset[key.replace(/data-/gi, '')] = props[key];
        }
    }
    return Object.assign({}, e, {
        currentTarget: {
            dataset: dataset
        },
        target: {
            dataset: dataset,
            targetDataset: dataset
        }
    });
}


}),
8841: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _module_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7127);
/* ESM import */var _module_a__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_module_a__WEBPACK_IMPORTED_MODULE_0__);
__webpack_require__(5296);
'use strict';
var _fmtEvent = _interopRequireDefault(__webpack_require__(9762));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
Component({
    data: {},
    props: {
        className: '',
        style: '',
        onClick: function onClick(e) {},
        onLongpress: function onLongpress(e) {},
        onAppear: function onAppear(e) {},
        onDisAppear: function onDisAppear(e) {},
        onTouchStart: function onTouchStart(e) {},
        onTouchMove: function onTouchMove(e) {},
        onTouchEnd: function onTouchEnd(e) {},
        onTouchCancel: function onTouchCancel(e) {},
        animation: null
    },
    didMount: function didMount() {},
    methods: {
        onClick: function onClick(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onClick(event);
        },
        onLongpress: function onLongpress(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onLongpress(event);
        },
        onAppear: function onAppear(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onAppear(event);
        },
        onDisAppear: function onDisAppear(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onDisAppear(event);
        },
        onTouchStart: function onTouchStart(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onTouchStart(event);
        },
        onTouchMove: function onTouchMove(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onTouchMove(event);
        },
        onTouchEnd: function onTouchEnd(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onTouchEnd(event);
        },
        onTouchCancel: function onTouchCancel(e) {
            var event = (0, _fmtEvent['default'])(this.props, e);
            this.props.onTouchCancel(event);
        }
    }
});


}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
var __webpack_exports__ = (__webpack_exec__(8841));

}
]);