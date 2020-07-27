import FetchProxy from "./FetchProxy"

export default class Flickr {
    constructor() {
      this.url =  "https://www.flickr.com/services/rest/";
      this.searchURL = "/search/photos?";
      this.api_key = "2a03dd37dabb2c41b6dc45866141593e";
  
      this.params = {
        search: {
          user_id: null,
          tags: 1,
          tag_mode: 20,
          text: "relevant",
          min_upload_date: null,
          max_upload_date: null,
          min_taken_date: null,
          max_taken_date: null,
          license: null,
          machine_tags: null,
          page: 1,
          geo_context: null
        },
      };
    }
  
    searchByName(params) {
      return new Promise((resolve, reject) => {
        let queryString = "";
        let response;
        this.params["search"].query = params;
        for (const [key, value] of Object.entries(this.params["search"])) {
          if (value) {
            queryString += `${key}=${value}`.concat("&");
          }
        }
        queryString =
          queryString.slice(0, queryString.length - 1) +
          "&client_id=" +
          this.clientId;
          const url = this.url + this.searchURL + queryString;
          const fetchProxy = new FetchProxy();
          fetchProxy.get(url).then((resp) => resp.json())
          .then((data) => {
            response = this.processResponse(data);
            resolve(response);
          });
      });
    }
  
    processResponse(response) {
      const imageList = [];
      const results = response.results;
      results.map(item => {
        imageList.push({'id':item.id, 'src': item.urls.regular});
      });
      return imageList;
    }
  }