var Ajax = {
  ajax: null,

  init() {
    if (!this.ajax) {
      this.ajax = new XMLHttpRequest();
    }
    return this.ajax;
  },

  get(url, callback) {
    var request = this.init();
    request.open("GET", url);
    request.send();
    request.onload = () => {
      callback(JSON.parse(request.responseText));
    };
  }
};
