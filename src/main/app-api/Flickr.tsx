import FetchProxy from "./FetchProxy";

export default class Flickr {
  name: string;
  url: string;
  api_key: string;
  paginationDepth: number;
  _params: any;
  
  
  constructor() {
    this.name = "flickr";
    this.url = "https://www.flickr.com/services/rest/?";
    this.api_key = `${process.env.REACT_APP_FLICKR_CLIENT_KEY}`;
    this.paginationDepth = 3;

    this._params = {
      search: {
        method: "flickr.photos.search",
        user_id: null,
        tags: null,
        tag_mode: null,
        text: null,
        min_upload_date: null,
        max_upload_date: null,
        min_taken_date: null,
        max_taken_date: null,
        license: null,
        machine_tags: null,
        page: 1,
        per_page: 500,
        geo_context: null,
      },
    };
  }
  get params() {
    return this._params;
  }

  set params(dprops) {
    this._params = dprops;
  }

  generateURL(params: string | number | boolean | null) {
    let queryString = "";
    if (params) {
      this.params["search"].text = encodeURIComponent(params);
      this.params["search"].tags = encodeURIComponent(params);
    }
    for (const [key, value] of Object.entries(this.params["search"])) {
      if (value) {
        queryString += `${key}=${value}`.concat("&");
      }
    }

    queryString =
      queryString.slice(0, queryString.length - 1) +
      "&api_key=" +
      this.api_key +
      "&format=json&nojsoncallback=1";
    const url = this.url + queryString;
    return url;
  }

  searchByName(params: any) {
    return new Promise((resolve, reject) => {
      let response: unknown;
      const url = this.generateURL(params);
      const fetchProxy = new FetchProxy();
      fetchProxy
        .get(url)
        .then((resp) => resp.json())
        .then((data) => {
          response = this.processResponse(data);
          this.addPaginatedResponse(response as any).then(() => resolve(response));
        });
    });
  }
  async addPaginatedResponse(resp: any[]) {
    if (this.params["search"].page === this.paginationDepth + 1) return;
    this.params["search"].page += 1;
    const url = this.generateURL(null);
    const fetchProxy = new FetchProxy();
    let res = await fetchProxy.asyncGET(url);
    res = res.photos.photo;
    res.forEach((item: { id: string; title: any; farm: any; server: any; secret: any; }) => {
      resp.push({
        id: "fl" + item.id,
        name: item.title,
        src: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
      });
    });
    await this.addPaginatedResponse(resp);
  }

  processResponse(response: { photos: any; }) {
    const imageList: { id: string; name: any; src: string; }[] = [];
    const results = response.photos;
    const images = results.photo;
    images.forEach((item: { id: string; title: any; farm: any; server: any; secret: any; }) => {
      imageList.push({
        id: "fl" + item.id,
        name: item.title,
        src: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
      });
    });
    return imageList;
  }
}
