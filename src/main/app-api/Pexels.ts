import FetchProxy from "./FetchProxy";

export default class Pexels {
  name: string;
  url: string;
  searchURL: string;
  api_key: string;
  paginationDepth: number;
  _params: any;
  
  constructor() {
    this.name = "pexels";
    this.url = "https://api.pexels.com/v1";
    this.searchURL = "/search?";
    this.api_key = `${process.env.REACT_APP_PEXELS_API_KEY}`;
    this.paginationDepth = 3;

    this._params = {
      search: {
        query: null,
        local: null,
        per_page: 80,
        page: 1,
      },
    };
  }

  get params() {
    return this._params;
  }

  set params(dprops) {
    this._params = dprops;
  }

  searchByName(params: string | number | boolean) {
    return new Promise((resolve, reject) => {
      let queryString = "";
      let response: unknown;
      this.params["search"].query = encodeURIComponent(params);
      for (const [key, value] of Object.entries(this.params["search"])) {
        if (value) {
          queryString += `${key}=${value}`.concat("&");
        }
      }
      queryString = queryString.slice(0, queryString.length - 1);
      const url = this.url + this.searchURL + queryString;
      const fetchProxy = new FetchProxy();
      const pheader = new Headers();
      pheader.append("Authorization", this.api_key);
      const myRequest = new Request(url, {
        method: "GET",
        headers: pheader,
        mode: "cors",
        cache: "default",
      });
      fetchProxy
        .getCustomRequest(myRequest)
        .then((resp) => resp.json())
        .then((data) => {
          response = this.processResponse(data);
          this.addPaginatedResponse(response as any, data.next_page).then(() =>
            resolve(response)
          );
        });
    });
  }

  async addPaginatedResponse(resp: any[], url: RequestInfo) {
    if (this.paginationDepth === 0) return resp;

    const fetchProxy = new FetchProxy();
    const pheader = new Headers();
    pheader.append("Authorization", this.api_key);
    const myRequest = new Request(url, {
      method: "GET",
      headers: pheader,
      mode: "cors",
      cache: "default",
    });
    const nresp = await fetchProxy.getACustomRequest(myRequest);
    const results = nresp.photos;
    results.forEach((item: { id: string; photographer: any; src: { medium: any; }; }) => {
      resp.push({
        id: "pex" + item.id,
        name: item.photographer,
        src: item.src.medium,
      });
    });
    this.paginationDepth--;
    this.addPaginatedResponse(resp, nresp.next_page);
  }

  processResponse(response: { photos: any; }) {
    const imageList: { id: string; name: any; src: any; }[] = [];
    const results = response.photos;
    results.forEach((item: { id: string; photographer: any; src: { medium: any; }; }) => {
      imageList.push({
        id: "pex" + item.id,
        name: item.photographer,
        src: item.src.medium,
      });
    });
    return imageList;
  }
}
