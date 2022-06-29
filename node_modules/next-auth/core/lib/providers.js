"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseProviders;

var _merge = require("../../lib/merge");

function parseProviders(params) {
  const {
    url,
    providerId
  } = params;
  const providers = params.providers.map(({
    options,
    ...rest
  }) => {
    var _userOptions$id, _userOptions$id2;

    const defaultOptions = normalizeProvider(rest);
    const userOptions = normalizeProvider(options);
    return (0, _merge.merge)(defaultOptions, { ...userOptions,
      signinUrl: `${url}/signin/${(_userOptions$id = userOptions === null || userOptions === void 0 ? void 0 : userOptions.id) !== null && _userOptions$id !== void 0 ? _userOptions$id : rest.id}`,
      callbackUrl: `${url}/callback/${(_userOptions$id2 = userOptions === null || userOptions === void 0 ? void 0 : userOptions.id) !== null && _userOptions$id2 !== void 0 ? _userOptions$id2 : rest.id}`
    });
  });
  const provider = providers.find(({
    id
  }) => id === providerId);
  return {
    providers,
    provider
  };
}

function normalizeProvider(provider) {
  var _provider$version;

  if (!provider) return;
  const normalizedProvider = Object.entries(provider).reduce((acc, [key, value]) => {
    if (["authorization", "token", "userinfo"].includes(key) && typeof value === "string") {
      var _url$searchParams;

      const url = new URL(value);
      acc[key] = {
        url: `${url.origin}${url.pathname}`,
        params: Object.fromEntries((_url$searchParams = url.searchParams) !== null && _url$searchParams !== void 0 ? _url$searchParams : [])
      };
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

  if (provider.type === "oauth" && !((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) && !provider.checks) {
    ;
    normalizedProvider.checks = ["state"];
  }

  return normalizedProvider;
}