require('./../runtime.js');
(my["webpackChunk"] = my["webpackChunk"] || []).push([["0"], {
2323: (function (module) {
var data = 'init data';
function getData() {
    return data;
}
function setData(value) {
    data = value;
}
module.exports = {
    getData: getData,
    setData: setData
};


}),

},function(__webpack_require__) {
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId) }
var __webpack_exports__ = (__webpack_exec__(2323));
module.exports = __webpack_exports__;

}
]);