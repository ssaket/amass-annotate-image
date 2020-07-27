export default class FetchProxy {
    constructor(url) {
      this.url = url;
    }
  
    get(url, params = { mode: "cors" }) {
      return fetch(url, params);
    }

    getCustomRequest(request){
      return fetch(request);
    }
  }