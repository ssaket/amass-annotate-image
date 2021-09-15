export default class FetchProxy {
    url: string;

    constructor(url: string = '') {
      this.url = url;
    }
  
    get(url: RequestInfo, params: any = { mode: "cors" }) {
      return fetch(url, params);
    }

    getCustomRequest(request: RequestInfo){
      return fetch(request);
    }

    async getACustomRequest(request: RequestInfo){
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

    async asyncGET(url: RequestInfo){
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