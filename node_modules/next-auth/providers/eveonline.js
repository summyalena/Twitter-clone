"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EVEOnline;

function EVEOnline(options) {
  return {
    id: "eveonline",
    name: "EVE Online",
    type: "oauth",
    authorization: "https://login.eveonline.com/oauth/authorize",
    token: "https://login.eveonline.com/oauth/token",
    userinfo: "https://login.eveonline.com/oauth/verify",

    profile(profile) {
      return {
        id: profile.CharacterID,
        name: profile.CharacterName,
        email: null,
        image: `https://image.eveonline.com/Character/${profile.CharacterID}_128.jpg`
      };
    },

    options
  };
}