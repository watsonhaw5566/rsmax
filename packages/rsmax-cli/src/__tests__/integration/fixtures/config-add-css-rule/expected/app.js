require('./rsmax-vendors.js');
require('./runtime.js');
"use strict";
(my["webpackChunk"] = my["webpackChunk"] || []).push([["509"], {
3884: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4500);
/* ESM import */var rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _rsmax_runtime_options___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9869);
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
9921: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3786);
/* ESM import */var _rsmax_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_config_add_css_rule_src_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8475);


App((0,_rsmax_runtime__WEBPACK_IMPORTED_MODULE_0__.createAppConfig)(_Users_wangjue_WebstormProjects_rspack_rsmax_packages_rsmax_cli_src_tests_integration_fixtures_config_add_css_rule_src_app_js__WEBPACK_IMPORTED_MODULE_1__["default"]));


}),
8475: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
});
/* ESM default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
    return props.children;
};


}),
2015: (function (module) {
module.exports = require("react");

}),
4500: (function (module) {
module.exports = require("rsmax/runtime");

}),
9869: (function (module) {
module.exports = require('/__rsmax_runtime_options__');

}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
__webpack_require__.O(0, ["567",], function() {
        return __webpack_exec__(3884), __webpack_exec__(9921);
      });
var __webpack_exports__ = __webpack_require__.O();

}
]);