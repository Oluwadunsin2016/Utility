// (function () {
//   const script = document.currentScript;
//   const widgetContainer = document.createElement("div");
//   widgetContainer.id = "widget-root";
//   script.parentNode.insertBefore(widgetContainer, script);

//   const iframe = document.createElement("iframe");
//   iframe.src = "https://utility-virid.vercel.app"; // Deploy URL
//   iframe.width = "100%";
//   iframe.height = "500px";
//   iframe.style.border = "none";
//   widgetContainer.appendChild(iframe);
// })();

window.UtilityWidget = function () {
  return {
    iframe: null,
    baseurl: "https://utility-virid.vercel.app",
    key: '',
    defaultOverflow: '',
    listener: null,
    banner: '',
    data: null,
    path: '',
    callbacks: {
      ready: null,
      completed: null,
      cancel: null,
      close: null,
      offer: null,
      offerSelected: null,
      request: null,
    },
    init: function (config) {
      if (!config) return alert('Unable to setup!');
      this.configure(config);
      this.listener = this.handleMessage.bind(this);
      return this;
    },
    configure: function (config = {}) {
      this.key = config.key
      this.banner = config.banner
      this.data = config.data;
      this.callbacks.ready = config.onReady
      this.callbacks.completed = config.onCompleted;
      this.callbacks.cancel = config.onCancel;
      this.callbacks.close = config.onClose;
      this.callbacks.offer = config.onOffer;
      this.callbacks.offerSelected = config.onOfferSelected;
      this.callbacks.request = config.onRequest;
      this.path = config.path || '';
    },
    open: function () {
      this.disableBodyScroll(true);
      this.setupListener();
      this.launchIframe();
      return this;
    },
    close: function () {
      if (this.iframe) this.iframe.remove();
      this.clearListener();
      this.enableBodyScroll();
    },
    jsonToBase64: function (obj) {
      return btoa(encodeURIComponent(JSON.stringify(obj)));
    },
    launchIframe: function () {
      const token = this.jsonToBase64(this.data);
      const url = new URL(this.baseurl.concat(this.path.replace(/^\//, '')));
      url.searchParams.set('token', token);
      const iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", url.href);
      iframe.setAttribute("allow", "geolocation");
      iframe.setAttribute('allow', 'clipboard-write');
      const style = {
        'z-index': '999999',
        display: 'block',
        background: 'rgba(0, 0, 0, 0.004)',
        border: '0px none transparent',
        overflow: 'hidden',
        visibility: 'visible',
        margin: '0px',
        padding: '0px',
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
      };
      Object.assign(iframe.style, style);
      iframe.marginwidth = "0";
      iframe.marginheight = "0";
      iframe.frameBorder = "0";
      iframe.vspace = "0";
      iframe.id = 'data-collection-widget';
      this.iframe = iframe;
      document.body.append(iframe);
    },
    setupListener: function () {
      window.addEventListener("message", this.listener);
    },
    clearListener: function () {
      window.removeEventListener('message', this.listener);
    },
    handleMessage: function (e) {
      const { id, data } = e.data;
      if (id === 'cclan-cancel') {
        if (this.callbacks.cancel) this.callbacks.cancel();
        this.close();
      } else if (id === 'cclan-frame-loaded') {
        if (this.callbacks.ready) this.callbacks.ready();
      } else if (id === 'cclan-completed') {
        if (this.callbacks.completed) this.callbacks.completed(data);
      } else if (id === 'cclan-offer') {
        if (this.callbacks.offer) this.callbacks.offer(data);
      } else if (id === 'cclan-offer-selected') {
        if (this.callbacks.offerSelected) this.callbacks.offerSelected(data);
      } else if (id === 'cclan-request') {
        if (this.callbacks.request) this.callbacks.request(data);
      } else if (id === 'cclan-close') {
        if (this.callbacks.close) this.callbacks.close(data);
        this.close();
      }
    },
    start(data) {
      if (!data.request || !data.request.amount || !data.request.tenor) return alert('Loan amount and tenor is required!');
      this.postMessage({ id: 'cclan_data', data });
    },
    postMessage(e) {
      this.iframe.contentWindow.postMessage(e, "*");
    },
    enableBodyScroll() {
      document.body.style.overflow = this.defaultOverflow;
    },
    disableBodyScroll() {
      this.defaultOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  };
}();