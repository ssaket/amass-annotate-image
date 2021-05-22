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

    async getACustomRequest(request){
      const response = await fetch(request);
      let content;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      else {
        content = await response.json();
        const jsonResponse = await content;
        return jsonResponse;
      }
    }

    async asyncGET(url){
      const response = await fetch(url, {mode: 'cors'});
      let content;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      else {
        content = await response.json();
        const jsonResponse = await content;
        return jsonResponse;
      }
    }
  }