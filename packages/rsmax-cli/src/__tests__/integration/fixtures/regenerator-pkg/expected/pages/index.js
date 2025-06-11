require('./../rsmax-vendors.js');
require('./../runtime.js');
"use strict";
(my["webpackChunk"] = my["webpackChunk"] || []).push([["1"], {
56: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  index: () => (index)
});
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
function index() {
    return _index.apply(this, arguments);
}
function _index() {
    _index = _asyncToGenerator(/*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
            while(1)switch(_context.prev = _context.next){
                case 0:
                    _context.next = 2;
                    return Promise.resolve('111');
                case 2:
                    return _context.abrupt("return", 111);
                case 3:
                case "end":
                    return _context.stop();
            }
        }, _callee);
    }));
    return _index.apply(this, arguments);
}


}),
57: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  foo: () => (foo),
  index2: () => (index2)
});
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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function test() {
    return _test.apply(this, arguments);
}
function _test() {
    _test = _asyncToGenerator(_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while(1){
                switch(_context2.prev = _context2.next){
                    case 0:
                        _context2.next = 2;
                        return Promise.resolve('111');
                    case 2:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2);
    }));
    return _test.apply(this, arguments);
}
var index2 = test;
var foo = 2;


}),
53: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_regenerator_pkg_src_pages_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);


Page((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_regenerator_pkg_src_pages_index_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/index'));


}),
54: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
/* ESM import */var rsmax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rsmax__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var foo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);
/* ESM import */var foo_index2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
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





function run() {
    return _run.apply(this, arguments);
}
function _run() {
    _run = _asyncToGenerator(/*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
            while(1)switch(_context.prev = _context.next){
                case 0:
                    _context.next = 2;
                    return (0,foo__WEBPACK_IMPORTED_MODULE_2__.index)();
                case 2:
                    _context.next = 4;
                    return (0,foo_index2__WEBPACK_IMPORTED_MODULE_3__.index2)();
                case 4:
                    return _context.abrupt("return", foo_index2__WEBPACK_IMPORTED_MODULE_3__.foo);
                case 5:
                case "end":
                    return _context.stop();
            }
        }, _callee);
    }));
    return _run.apply(this, arguments);
}
/* ESM default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    react__WEBPACK_IMPORTED_MODULE_0___default().useState(function() {
        run().catch(function() {});
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.Text, {
                children: "hello"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
                "data-aspm-expo": "d1234",
                children: "foo"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rsmax__WEBPACK_IMPORTED_MODULE_1__.View, {
                "data-aspm-click": "d5678",
                children: "bar"
            })
        ]
    });
};


}),
7: (function (module) {
module.exports = require("react");

}),
58: (function (module) {
module.exports = require("react/jsx-runtime");

}),
55: (function (module) {
module.exports = require("rsmax");

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["2",], function() {
        return __webpack_exec__(53);
      });
var __webpack_exports__ = __webpack_require__.O();

}
]);