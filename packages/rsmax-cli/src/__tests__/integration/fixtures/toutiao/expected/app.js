require('./rsmax-vendors.js');
require('./runtime.js');
"use strict";
(tt["webpackChunk"] = tt["webpackChunk"] || []).push([["0"], {
53: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin


}),
0: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__);


var pluginDriver = new rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.PluginDriver([].map(function(p) {
    return p.default || p;
}));
rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.RuntimeOptions.apply({
    platform: "toutiao",
    debug: false,
    pxToRpx: true,
    pluginDriver: pluginDriver,
    hostComponents: _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__.hostComponents,
    pageEvents: _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__.pageEvents,
    appEvents: _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__.appEvents
});


}),
3: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_toutiao_src_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
__webpack_require__(53);


App((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createAppConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_toutiao_src_app_js__WEBPACK_IMPORTED_MODULE_1__["default"]));


}),
52: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var _app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);

var App = function App(props) {
    return props.children;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);


}),
7: (function (module) {
module.exports = require("react");

}),
1: (function (module) {
module.exports = require("rsmax/runtime");

}),
2: (function (module) {
module.exports = require('/__rsmax_runtime_options__');

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["2",], function() {
        return __webpack_exec__(0), __webpack_exec__(3);
      });
var __webpack_exports__ = __webpack_require__.O();

}
]);