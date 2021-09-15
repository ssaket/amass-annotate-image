import FetchProxy from "./FetchProxy";

export default class Pixabay {
  name: string;
  url: string;
  searchURL: string;
  clientId: string;
  params: any;
  constructor() {
    this.name = "pixabay";
    this.url = "https://pixabay.com";
    this.searchURL = "/api/?";
    this.clientId = `${process.env.REACT_APP_PIXABAY_API_KEY}`;

    this.params = {
      search: {
        q: null,
        lang: "en",
        image_type: null,
        category: null,
        colors: null,
        editors_choice: null,
        order: null,
        page: 1,
        per_page: 200,
        orientation: null,
      },
    };
  }

  searchByName(params: string | number | boolean) {
    return new Promise((resolve, reject) => {
      let queryString = "";
      let response;
      this.params["search"].q = encodeURIComponent(params);
      for (const [key, value] of Object.entries(this.params["search"])) {
        if (value) {
          queryString += `${key}=${value}`.concat("&");
        }
      }

      queryString =
        queryString.slice(0, queryString.length - 1) + "&key=" + this.clientId;
      const url = this.url + this.searchURL + queryString;
      const fetchProxy = new FetchProxy();
      fetchProxy
        .get(url)
        .then((resp) => resp.json())
        .then((data) => {
          response = this.processResponse(data);
          resolve(response);
        });
    });
  }

  processResponse(response: { hits: any; }) {
    const imageList: { id: any; src: any; }[] = [];
    const results = response.hits;
    results.forEach((item: { id: any; webformatURL: any; }) => {
      imageList.push({ id: item.id, src: item.webformatURL });
    });
    return imageList;
  }
}
