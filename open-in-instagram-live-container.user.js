// ==UserScript==
// @name         Open in Instagram Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://*.instagram.com/*
// @downloadURL  https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-instagram-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-instagram-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main
// ==/UserScript==

// need to encode the string to base64 for live container link to work
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function openInInstagram() {
  let redirect =
    `livecontainer://open-web-page?url=` +
    utf8_to_b64(
      document.querySelector('[property="al:ios:url"]')?.getAttribute("content")
    );

  window.location.href = redirect;
}

openInInstagram();
