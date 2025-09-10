require('./../../rsmax-vendors.js');
require('./../../runtime.js');
"use strict";
(my["webpackChunk"] = my["webpackChunk"] || []).push([["2"], {
58: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin


}),
57: (function (module, __unused_webpack_exports, __webpack_require__) {
module.exports = __webpack_require__.p + "ae668fec285d0da4.jpg";

}),
4: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_mini_plugin_basic_src_pages_index_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53);
__webpack_require__(58);


Page((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_mini_plugin_basic_src_pages_index_index_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/index/index'));


}),
53: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rsmax__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _components_greet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* ESM import */var _assets_images_cat_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);
/* ESM import */var _index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(56);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ 
    _regeneratorRuntime = function _regeneratorRuntime() {
        return r;
    };
    var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag";
    function c(t, r, e, n) {
        return Object.defineProperty(t, r, {
            value: e,
            enumerable: !n,
            configurable: !n,
            writable: !n
        });
    }
    try {
        c({}, "");
    } catch (t) {
        c = function c(t, r, e) {
            return t[r] = e;
        };
    }
    function h(r, e, n, o) {
        var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype);
        return c(a, "_invoke", function(r, e, n) {
            var o = 1;
            return function(i, a) {
                if (3 === o) throw Error("Generator is already running");
                if (4 === o) {
                    if ("throw" === i) throw a;
                    return {
                        value: t,
                        done: !0
                    };
                }
                for(n.method = i, n.arg = a;;){
                    var u = n.delegate;
                    if (u) {
                        var c = d(u, n);
                        if (c) {
                            if (c === f) continue;
                            return c;
                        }
                    }
                    if ("next" === n.method) n.sent = n._sent = n.arg;
                    else if ("throw" === n.method) {
                        if (1 === o) throw o = 4, n.arg;
                        n.dispatchException(n.arg);
                    } else "return" === n.method && n.abrupt("return", n.arg);
                    o = 3;
                    var h = s(r, e, n);
                    if ("normal" === h.type) {
                        if (o = n.done ? 4 : 2, h.arg === f) continue;
                        return {
                            value: h.arg,
                            done: n.done
                        };
                    }
                    "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
                }
            };
        }(r, n, new Context(o || [])), !0), a;
    }
    function s(t, r, e) {
        try {
            return {
                type: "normal",
                arg: t.call(r, e)
            };
        } catch (t) {
            return {
                type: "throw",
                arg: t
            };
        }
    }
    r.wrap = h;
    var f = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var l = {};
    c(l, i, function() {
        return this;
    });
    var p = Object.getPrototypeOf, y = p && p(p(x([])));
    y && y !== e && n.call(y, i) && (l = y);
    var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
    function g(t) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(r) {
            c(t, r, function(t) {
                return this._invoke(r, t);
            });
        });
    }
    function AsyncIterator(t, r) {
        function e(o, i, a, u) {
            var c = s(t[o], t, i);
            if ("throw" !== c.type) {
                var h = c.arg, f = h.value;
                return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function(t) {
                    e("next", t, a, u);
                }, function(t) {
                    e("throw", t, a, u);
                }) : r.resolve(f).then(function(t) {
                    h.value = t, a(h);
                }, function(t) {
                    return e("throw", t, a, u);
                });
            }
            u(c.arg);
        }
        var o;
        c(this, "_invoke", function(t, n) {
            function i() {
                return new r(function(r, o) {
                    e(t, n, r, o);
                });
            }
            return o = o ? o.then(i, i) : i();
        }, !0);
    }
    function d(r, e) {
        var n = e.method, o = r.i[n];
        if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
        var i = s(o, r.i, e.arg);
        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
        var a = i.arg;
        return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
    }
    function w(t) {
        this.tryEntries.push(t);
    }
    function m(r) {
        var e = r[4] || {};
        e.type = "normal", e.arg = t, r[4] = e;
    }
    function Context(t) {
        this.tryEntries = [
            [
                -1
            ]
        ], t.forEach(w, this), this.reset(!0);
    }
    function x(r) {
        if (null != r) {
            var e = r[i];
            if (e) return e.call(r);
            if ("function" == typeof r.next) return r;
            if (!isNaN(r.length)) {
                var o = -1, a = function e() {
                    for(; ++o < r.length;)if (n.call(r, o)) return e.value = r[o], e.done = !1, e;
                    return e.value = t, e.done = !0, e;
                };
                return a.next = a;
            }
        }
        throw new TypeError(_typeof(r) + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function(t) {
        var r = "function" == typeof t && t.constructor;
        return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
    }, r.mark = function(t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
    }, r.awrap = function(t) {
        return {
            __await: t
        };
    }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function() {
        return this;
    }), r.AsyncIterator = AsyncIterator, r.async = function(t, e, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new AsyncIterator(h(t, e, n, o), i);
        return r.isGeneratorFunction(e) ? a : a.next().then(function(t) {
            return t.done ? t.value : a.next();
        });
    }, g(v), c(v, u, "Generator"), c(v, i, function() {
        return this;
    }), c(v, "toString", function() {
        return "[object Generator]";
    }), r.keys = function(t) {
        var r = Object(t), e = [];
        for(var n in r)e.unshift(n);
        return function t() {
            for(; e.length;)if ((n = e.pop()) in r) return t.value = n, t.done = !1, t;
            return t.done = !0, t;
        };
    }, r.values = x, Context.prototype = {
        constructor: Context,
        reset: function reset(r) {
            if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for(var e in this)"t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
        },
        stop: function stop() {
            this.done = !0;
            var t = this.tryEntries[0][4];
            if ("throw" === t.type) throw t.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(r) {
            if (this.done) throw r;
            var e = this;
            function n(t) {
                a.type = "throw", a.arg = r, e.next = t;
            }
            for(var o = e.tryEntries.length - 1; o >= 0; --o){
                var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2];
                if (-1 === i[0]) return n("end"), !1;
                if (!c && !h) throw Error("try statement without catch or finally");
                if (null != i[0] && i[0] <= u) {
                    if (u < c) return this.method = "next", this.arg = t, n(c), !0;
                    if (u < h) return n(h), !1;
                }
            }
        },
        abrupt: function abrupt(t, r) {
            for(var e = this.tryEntries.length - 1; e >= 0; --e){
                var n = this.tryEntries[e];
                if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
                    var o = n;
                    break;
                }
            }
            o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
            var i = o ? o[4] : {};
            return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
        },
        complete: function complete(t, r) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
        },
        finish: function finish(t) {
            for(var r = this.tryEntries.length - 1; r >= 0; --r){
                var e = this.tryEntries[r];
                if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
            }
        },
        catch: function _catch(t) {
            for(var r = this.tryEntries.length - 1; r >= 0; --r){
                var e = this.tryEntries[r];
                if (e[0] === t) {
                    var n = e[4];
                    if ("throw" === n.type) {
                        var o = n.arg;
                        m(e);
                    }
                    return o;
                }
            }
            throw Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(r, e, n) {
            return this.delegate = {
                i: x(r),
                r: e,
                n: n
            }, "next" === this.method && (this.arg = t), f;
        }
    }, r;
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
function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
        var i = n[a](c), u = i.value;
    } catch (n) {
        return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
    return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
            }
            function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
            }
            _next(void 0);
        });
    };
}
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}





// CASE: cloneElement

var TextElement = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().cloneElement(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.Text, {
    id: "text",
    children: "clonedElement"
}));
/* ESM default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    var _obj$a;
    var props = {
        className: 'class-view'
    };
    var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), obj = _React$useState2[0], setObj = _React$useState2[1];
    var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), touched = _React$useState4[0], setTouched = _React$useState4[1];
    // CASE: regenerator runtime
    function handleClick() {
        return _handleClick.apply(this, arguments);
    }
    function _handleClick() {
        _handleClick = _asyncToGenerator(/*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
                while(1)switch(_context.prev = _context.next){
                    case 0:
                        _context.next = 2;
                        return Promise.resolve(1);
                    case 2:
                        setObj({
                            a: {
                                b: 'valueIn:obj.a.b'
                            }
                        });
                    case 3:
                    case "end":
                        return _context.stop();
                }
            }, _callee);
        }));
        return _handleClick.apply(this, arguments);
    }
    function handleTouchStart() {
        setTouched(true);
    }
    // CASE: 新语法
    var didTouched =  true && undefined !== void 0 ? undefined : touched;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, _objectSpread(_objectSpread({
                onClick: handleClick,
                onTouchStart: handleTouchStart,
                id: "view",
                "data-foo": "dataFooAttribute"
            }, props), {}, {
                children: [
                    "viewInnerText",
                    obj === null || obj === void 0 || (_obj$a = obj.a) === null || _obj$a === void 0 ? void 0 : _obj$a.b,
                    didTouched ? 'touchedTrigger' : ''
                ]
            })),
            TextElement,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.Image, {
                className: "cat-image",
                src: _assets_images_cat_jpg__WEBPACK_IMPORTED_MODULE_3__
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
                className: "dog-image"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_greet__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "word"
            })
        ]
    });
};


}),
8: (function (module) {
module.exports = require("react");

}),
56: (function (module) {
module.exports = require("react/jsx-runtime");

}),
54: (function (module) {
module.exports = require("rsmax");

}),
2: (function (module) {
module.exports = require("rsmax/runtime");

}),
3: (function (module) {
module.exports = require("/__rsmax_runtime_options__");

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["3",], function() {
        return __webpack_exec__(1), __webpack_exec__(4);
      });
var __webpack_exports__ = __webpack_require__.O();
module.exports = __webpack_exports__;

}
]);