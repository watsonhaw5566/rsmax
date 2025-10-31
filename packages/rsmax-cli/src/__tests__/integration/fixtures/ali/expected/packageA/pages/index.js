require('./../../rsmax-styles.js');
require('./../../rsmax-vendors.js');
require('./../../runtime.js');
"use strict";
(my["webpackChunk"] = my["webpackChunk"] || []).push([["111"], {
2860: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin


}),
2115: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3786);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_ali_src_packageA_pages_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4673);
__webpack_require__(2860);


Page((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_ali_src_packageA_pages_index_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'packageA/pages/index'));


}),
4673: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2015);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9887);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rsmax__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _components_C__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8767);
/* ESM import */var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2860);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8732);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}





/* ESM default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    var props = {};
    var TextElement = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.Text, {}));
    function handleClick() {}
    function handleTouchStart() {}
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "pageA-index",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_C__WEBPACK_IMPORTED_MODULE_2__["default"], {
                className: "a"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, _objectSpread(_objectSpread({
                onClick: handleClick,
                onTouchStart: handleTouchStart,
                id: "view",
                "data-foo": "bar"
            }, props), {}, {
                children: "foo"
            })),
            TextElement
        ]
    });
};


}),
2015: (function (module) {
module.exports = require("react");

}),
8732: (function (module) {
module.exports = require("react/jsx-runtime");

}),
9887: (function (module) {
module.exports = require("rsmax");

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["492","567",], function() {
        return __webpack_exec__(2115);
      });
var __webpack_exports__ = __webpack_require__.O();

}
]);