"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = email;

var _crypto = require("crypto");

var _utils = require("../utils");

async function email(identifier, options) {
  var _await$provider$gener, _provider$generateVer, _provider$maxAge;

  const {
    url,
    adapter,
    provider,
    logger,
    callbackUrl
  } = options;
  const token = (_await$provider$gener = await ((_provider$generateVer = provider.generateVerificationToken) === null || _provider$generateVer === void 0 ? void 0 : _provider$generateVer.call(provider))) !== null && _await$provider$gener !== void 0 ? _await$provider$gener : (0, _crypto.randomBytes)(32).toString("hex");
  const ONE_DAY_IN_SECONDS = 86400;
  const expires = new Date(Date.now() + ((_provider$maxAge = provider.maxAge) !== null && _provider$maxAge !== void 0 ? _provider$maxAge : ONE_DAY_IN_SECONDS) * 1000);
  await adapter.createVerificationToken({
    identifier,
    token: (0, _utils.hashToken)(token, options),
    expires
  });
  const params = new URLSearchParams({
    callbackUrl,
    token,
    email: identifier
  });
  const _url = `${url}/callback/${provider.id}?${params}`;

  try {
    await provider.sendVerificationRequest({
      identifier,
      token,
      expires,
      url: _url,
      provider
    });
  } catch (error) {
    logger.error("SEND_VERIFICATION_EMAIL_ERROR", {
      identifier,
      url,
      error: error
    });
    throw new Error("SEND_VERIFICATION_EMAIL_ERROR");
  }
}