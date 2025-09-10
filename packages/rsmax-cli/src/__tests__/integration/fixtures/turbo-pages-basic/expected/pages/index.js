require('./../rsmax-vendors.js');
require('./../runtime.js');
"use strict";
(my["webpackChunk"] = my["webpackChunk"] || []).push([["2"], {
56: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);

/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createNativeComponent)('native-component-index-f24c316'));


}),
53: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_turbo_pages_basic_src_pages_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);


Page((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_turbo_pages_basic_src_pages_index_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/index'));


}),
54: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (Index)
});
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rsmax__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _components_nativeComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57);
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







var RenameView = rsmax__WEBPACK_IMPORTED_MODULE_2__.View;
var Deep = {
    Object: {
        View: rsmax__WEBPACK_IMPORTED_MODULE_2__.View
    }
};
var DDD = (0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createHostComponent)('ddd');
function ReactComp(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    children: "react component"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        children: "Text inside Fragment"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                    children: "View inside Expression"
                }),
                react__WEBPACK_IMPORTED_MODULE_1___default().Children.map(children, function(child, index) {
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().cloneElement(child, {
                        id: 'reactComp' + index
                    });
                })
            ]
        })
    });
}
function Index() {
    var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default().useState(1), _React$useState2 = _slicedToArray(_React$useState, 1), count = _React$useState2[0];
    var props = {
        id: 'spreadId'
    };
    var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1___default().useState(true), _React$useState4 = _slicedToArray(_React$useState3, 1), show = _React$useState4[0];
    var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1___default().useState(true), _React$useState6 = _slicedToArray(_React$useState5, 1), showPlainText = _React$useState6[0];
    var plainText = 'plain-text-leaf';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
        entry: true,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [
                'expression entry',
                123313,
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                            children: "Fragment Text 1"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                            children: "Fragment Text 2"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                    children: "Fragment Text 3"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                    children: "Fragment Text 4"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                    children: "Fragment"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
                    children: "React.Fragment"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(DDD, {}),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    children: "remax.Text"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_nativeComponent__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    "ns:attr": "1"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(ReactComp, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                            children: "React Component First Child"
                        }),
                        'React Component Second Child'
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                    className: "className",
                    children: [
                        "Count: ",
                        count
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                    id: count,
                    className: 'class',
                    children: "view"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                    children: "custom view"
                }),
                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement('view', {
                    id: 'view'
                }, [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                        __key: "1",
                        children: "create element children 1"
                    }, "1"),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement('view', {
                        key: '2'
                    })
                ]),
                [
                    1,
                    2,
                    3
                ].map(function(item) {
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                        __key: item,
                        children: [
                            "array map: ",
                            item
                        ]
                    }, item);
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, _objectSpread(_objectSpread({}, props), {}, {
                    children: "Spread Attributes View"
                })),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    children: "long long long long long long long long long long long long text long long long long long long long long long long long long text"
                }),
                'Literal Expression',
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Deep.Object.View, {
                    children: "Deep Object View"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(RenameView, {
                    children: "Rename View"
                }),
                show && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.View, {
                    children: "Conditional View"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    leaf: true,
                    children: showPlainText && plainText
                })
            ]
        })
    });
}


}),
7: (function (module) {
module.exports = require("react");

}),
57: (function (module) {
module.exports = require("react/jsx-runtime");

}),
55: (function (module) {
module.exports = require("rsmax");

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["3",], function() {
        return __webpack_exec__(53);
      });
var __webpack_exports__ = __webpack_require__.O();

}
]);