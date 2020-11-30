replaceText = (node) => {
  if (node.nodeType === 1 && node.hasAttribute("contenteditable")) {
    return;
  } else if (node.hasChildNodes()) {
    node.childNodes.forEach(replaceText);
  } else if (node.nodeType === Text.TEXT_NODE) {
    node.textContent = node.textContent.replace(/^hm(m+)/gi, "Got it! Thanks!");
    node.textContent = node.textContent.replace(/\.+/gi, ".");
  }
};

replaceContent = () => {
  replaceText(document.body);
};

// only fire when Dom is finished loading
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    // this will observe any/all changes in DOM
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver((mutations, observer) => {
      replaceContent();
    });
    observer.observe(document, { subtree: true, childList: true });
  }
});
