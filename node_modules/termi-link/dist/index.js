"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/termi-link.ts
var termi_link_exports = {};
__export(termi_link_exports, {
  ANSI_RESET: () => ANSI_RESET,
  isSupported: () => isSupported,
  terminalLink: () => terminalLink
});
module.exports = __toCommonJS(termi_link_exports);
var ENVIRONMENT_VARIABLES = [
  "DOMTERM",
  "WT_SESSION",
  "KONSOLE_VERSION"
];
function parseVersion(version) {
  const [major = 0, minor = 0, patch = 0] = version.split(".").map(Number);
  return { major, minor, patch };
}
function hasEnv(name) {
  return process.env[name] !== void 0;
}
function getEnv(name) {
  return process.env[name] || "";
}
function matchesEnv(name, values) {
  return hasEnv(name) && values.includes(getEnv(name));
}
function checkAllEnvs(vars) {
  return vars.some((v) => hasEnv(v));
}
function supportsHyperlinks() {
  if (matchesEnv("TERMI_LINK_HYPERLINK", ["1", "true", "always", "enabled"])) {
    return true;
  }
  if (matchesEnv("TERMI_LINK_HYPERLINK", ["0", "false", "never", "disabled"])) {
    return false;
  }
  if (hasEnv("VTE_VERSION")) {
    const v = parseVersion(getEnv("VTE_VERSION"));
    return v.major > 5e3;
  }
  if (hasEnv("TERM_PROGRAM")) {
    const v = parseVersion(getEnv("TERM_PROGRAM_VERSION"));
    const term = getEnv("TERM_PROGRAM");
    switch (term) {
      case "iTerm.app":
        return v.major > 3 || v.major === 3 && v.minor >= 1;
      case "WezTerm":
        return v.major >= 20200620;
      case "vscode":
        return v.major > 1 || v.major === 1 && v.minor >= 72;
      case "ghostty":
        return v.major >= 1;
      case "terminology":
        return v.major >= 1 && v.minor >= 2;
      case "Hyper":
        return v.major >= 3;
      case "alacritty":
        return v.major >= 0 && v.minor >= 11;
      case "kitty":
        return v.major >= 0 && v.minor >= 19;
      default:
        return false;
    }
  }
  if (matchesEnv("TERM", ["xterm-kitty", "alacritty", "alacritty-direct", "xterm-ghostty"])) {
    return true;
  }
  if (matchesEnv("COLORTERM", ["xfce4-terminal"])) {
    return true;
  }
  if (matchesEnv("TERMINAL_EMULATOR", ["JetBrains-JediTerm"])) {
    return true;
  }
  if (checkAllEnvs(ENVIRONMENT_VARIABLES)) {
    return true;
  }
  return false;
}
var ANSI_RESET = "\x1B[0m";
function sanitizeUrl(url) {
  return url.replace(/[\x00-\x1F\x7F]/g, "");
}
function terminalLink(text, url, options) {
  const { fallback = null } = options || {};
  if (supportsHyperlinks()) {
    const sanitized = sanitizeUrl(url);
    return `\x1B]8;;${sanitized}\x07${text || sanitized}\x1B]8;;\x07`;
  }
  if (fallback == null) {
    if (!text) {
      return `${sanitizeUrl(url)}`;
    }
    return `${text} (${sanitizeUrl(url)})`;
  } else if (fallback === false) {
    return ``;
  } else {
    return fallback(text, url);
  }
}
function isSupported() {
  return supportsHyperlinks();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANSI_RESET,
  isSupported,
  terminalLink
});
//# sourceMappingURL=index.js.map