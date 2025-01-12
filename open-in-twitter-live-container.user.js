// ==UserScript==
// @name         Open X(Twitter) App Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://x.com/*
// @downloadURL  https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-twitter-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-twitter-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main

// ==/UserScript==

// THANKS TO https://gist.github.com/ryuya0124/e6e59ceba8f03bf40f3b5accedc52e44 for the original code.

// need to encode the string to base64 for live container link to work
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function openInTwitterX() {
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;

  const timelinePaths = [
    "/home",
    "/i/communitynotes",
    "/i/verified-orgs-signup",
  ];

  const includePaths = ["/list"];

  if (
    currentPath === "/i/timeline" ||
    currentPath.startsWith("/notifications")
  ) {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("twitter://mentions");
  } else if (currentPath === "/i/grok") {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("twitter://grok");
  } else if (
    timelinePaths.some((path) => currentPath.startsWith(path)) ||
    includePaths.some((path) => currentPath.includes(path))
  ) {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("twitter://timeline");
  } else if (currentPath === "/messages") {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("twitter://messages");
  } else if (currentPath.startsWith("/messages/")) {
    const conversationId = currentPath.match(/\/messages\/([^/]+)/)[1];
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(`twitter://messages?id=${conversationId}`);
  } else if (currentPath.match(/\/status\/\d+$/)) {
    const statusId = currentPath.match(/\/status\/(\d+)/)[1];
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(`twitter://status?id=${statusId}`);
  } else if (
    currentPath === "/compose/tweet" ||
    currentPath === "/compose/post"
  ) {
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64("twitter://post?message");
  } else if (
    currentPath === "/intent/tweet" ||
    currentPath === "/intent/post"
  ) {
    // 'text=', 'url=', 'hashtags=' を取り除き、hashtags を %23 に置換
    const param = currentSearch
      .replace("?text=", "") // 'text=' を取り除く
      .replace("&url=", "") // 'url=' を取り除く
      .replace("&hashtags=", "%23"); // 'hashtags=' を %23 に置換

    // messageUrl を生成
    const messageUrl =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(`twitter://post?message=${param}`);

    // 結果を表示して、リンク先にリダイレクト
    alert(messageUrl);
    window.location.href = messageUrl;
  } else if (currentPath === "/explore") {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("twitter://explore");
  } else if (currentPath === "/search" && currentSearch.includes("?q=")) {
    const searchTerm = currentSearch.match(/q=(.*?)&/)[1];
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(`twitter://search?query=${searchTerm}`);
  } else if (currentPath.startsWith("/i/bookmarks")) {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("twitter://bookmarks");
  } else if (currentPath.includes("/communities")) {
    const communityIdMatch = currentPath.match(/\/communities\/([^/]+)/);
    const communityId = communityIdMatch ? communityIdMatch[1] : "";
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(`twitter://communities/${communityId}`);
  } else if (currentPath.startsWith("/") && currentPath != "/oauth/authorize") {
    const screenName = currentPath.match(/\/([^/]+)/)[1];
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(
        `twitter://user?screen_name=${encodeURIComponent(screenName)}`
      );
  }
}

openInTwitterX();
