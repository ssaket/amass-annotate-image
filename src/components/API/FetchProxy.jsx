export default class FetchProxy {
    constructor(url) {
      this.url = url;
    }
  
    get(url) {
      return fetch(url, { mode: "cors" });
    }
  }