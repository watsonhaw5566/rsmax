require('./runtime.js');
(my["webpackChunk"] = my["webpackChunk"] || []).push([["0"], {
0: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__);


var pluginDriver = new rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.PluginDriver([].map(function(p) {
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
3: (function () {
App({});


}),
1: (function (module) {
"use strict";
module.exports = require("rsmax/runtime");

}),
2: (function (module) {
"use strict";
module.exports = require('/__rsmax_runtime_options__');

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
var __webpack_exports__ = (__webpack_exec__(0), __webpack_exec__(3));

}
]);