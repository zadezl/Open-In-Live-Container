// ==UserScript==
// @name         Open in Instagram Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://*.instagram.com/*
// @downloadURL  https://gist.github.com/nathandaven/76fd9c1e9e7c30eaea29003120acb4ae/raw/62f5aa9d52998135346bc622244a66879becc6d2/open-instagram-app-live-container.user.js
// @updateURL    https://gist.github.com/nathandaven/76fd9c1e9e7c30eaea29003120acb4ae/raw/62f5aa9d52998135346bc622244a66879becc6d2/open-instagram-app-live-container.user.js
// @homepage     https://gist.github.com/nathandaven/76fd9c1e9e7c30eaea29003120acb4ae
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
