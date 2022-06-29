"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCallbacks = void 0;
const defaultCallbacks = {
  signIn() {
    return true;
  },

  redirect({
    url,
    baseUrl
  }) {
    if (url.startsWith(baseUrl)) return url;else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
    return baseUrl;
  },

  session({
    session
  }) {
    return session;
  },

  jwt({
    token
  }) {
    return token;
  }

};
exports.defaultCallbacks = defaultCallbacks;