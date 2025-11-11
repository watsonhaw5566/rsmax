require('./rsmax-vendors.js');
require('./runtime.js');
"use strict";
(my["webpackChunk"] = my["webpackChunk"] || []).push([["0"], {
3884: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4500);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9869);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__);


var pluginDriver = new rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.PluginDriver([
    __webpack_require__(3805)
].map(function(p) {
    return p.default || p;
}));
rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.RuntimeOptions.apply({
    platform: "ali",
    debug: false,
    pxToRpx: true,
    pluginDriver: pluginDriver,
    hostComponents: _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__.hostComponents,
    pageEvents: _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__.pageEvents,
    appEvents: _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__.appEvents
});


}),
3805: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2015);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9887);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rsmax__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8732);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
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



/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    onPageComponent: function onPageComponent(_ref) {
        var component = _ref.component, page = _ref.page;
        var AppLayout = function AppLayout(props) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
                id: "app-layout",
                children: props.children
            });
        };
        // 注意这里一定要用 React.forwardRef 把 ref 传下去
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function(props, ref) {
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AppLayout, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(component, _objectSpread(_objectSpread({}, props), {}, {
                ref: ref
            })));
        });
    }
});


}),
9921: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3786);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_runtime_plugin_with_jsx_src_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8475);


App((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createAppConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_runtime_plugin_with_jsx_src_app_js__WEBPACK_IMPORTED_MODULE_1__["default"]));


}),
8475: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (App)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2015);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
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
function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
}

var App = /*#__PURE__*/ function(_React$Component) {
    function App() {
        _classCallCheck(this, App);
        return _callSuper(this, App, arguments);
    }
    _inherits(App, _React$Component);
    return _createClass(App, [
        {
            key: "render",
            value: function render() {
                return this.props.children;
            }
        }
    ]);
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));



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
4500: (function (module) {
module.exports = require("rsmax/runtime");

}),
9869: (function (module) {
module.exports = require('/__rsmax_runtime_options__');

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["2",], function() {
        return __webpack_exec__(3884), __webpack_exec__(9921);
      });
var __webpack_exports__ = __webpack_require__.O();

}
]);