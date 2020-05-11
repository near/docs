// Hotjar Tracking Code for docs.near.org
(function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = { hjid: 1581778, hjsv: 6 };
  a = o.getElementsByTagName("head")[0];
  r = o.createElement("script");
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

/**
    How to Whitelist Elements and Keystrokes
    https://help.hotjar.com/hc/en-us/articles/115015563287-How-to-Whitelist-Elements-and-Keystrokes

    chose to capture Algolia search terms in real time through hotjar to see what people did once
    they searched.  Algolia reports similar data but this ties it in nicely with on-page behavior
 */
(function () {
  window.addEventListener("DOMContentLoaded", (event) => {
    document
      .querySelector("input#search_input_react")
      .classList.add("data-hj-whitelist");
  });
})();
