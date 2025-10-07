// ==UserScript==
// @name         Open in Youtube Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://*.spotify.com/*
// @downloadURL  https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-youtube-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-youtube-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main
// ==/UserScript==

// need to encode the string to base64 for live container link to work
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function openInSpotify() {
  if (window.self !== window.top) return; // iframe
  if (window.location.pathname === "/redirect") return; // Opening link in browser from app
  
  window.location.href =
    `livecontainer://open-web-page?url=` +
    utf8_to_b64(
      `spotify:${window.location.pathname.slice(1)}${window.location.search}${
        window.location.hash
      }`
    );
}
openInSpotify();
