(function () {
  const script = document.currentScript;
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "widget-root";
  script.parentNode.insertBefore(widgetContainer, script);

  const iframe = document.createElement("iframe");
  iframe.src = "https://your-widget-url.com"; // Deploy URL
  iframe.width = "100%";
  iframe.height = "500px";
  iframe.style.border = "none";
  widgetContainer.appendChild(iframe);
})();