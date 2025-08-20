"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create a pre-configured instance of axios
var api = _axios["default"].create({
  baseURL: 'http://127.0.0.1:8000/api',
  // Your Django API's base URL
  headers: {
    'Content-Type': 'application/json'
  }
}); // We will add an interceptor here later to handle JWT tokens automatically


var _default = api;
exports["default"] = _default;
//# sourceMappingURL=api.dev.js.map
