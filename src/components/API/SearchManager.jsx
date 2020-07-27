class Commands {
  constructor(recv) {
    this.recv = recv;
    if (new.target === Commands) {
      throw "Can't create object of the abstract class";
    }
  }
  execute() {}
}

class SearchByName extends Commands {
  constructor(recv, searchTerm) {
    super(recv);
    this.recv = recv;
    this.searchTerm = searchTerm;
  }

  execute() {
    return this.recv.searchByName(this.searchTerm);
  }
}

class SearchByTag extends Commands {
  constructor(recv) {
    this.recv = recv;
  }
  execute() {
    this.recv.action();
  }
}

class FetchProxy {
  constructor(url) {
    this.url = url;
  }

  get(url) {
    return fetch(url, { mode: "cors" });
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (text) {
    //   // console.log(text);
    // })
    // .catch(function (error) {
    //   // console.log("Request failed", error);
    // });
  }
}

class Unsplash {
  constructor() {
    this.url = "https://api.unsplash.com";
    this.searchURL = "/search/photos?";
    this.clientId = "G0UkTjGEIYoKIGv4KLA8h-gMyCoIKOrI6PrPOaUOGtI";

    this.params = {
      search: {
        query: "london",
        page: 1,
        per_page: 20,
        order_by: "relevant",
        color: null,
        orientation: null,
      },
    };
  }

  searchByName(name) {
    return new Promise((resolve, reject) => {
      let queryString = "";
      let response;
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

class Flickr {
  searchByName() {}

  action() {}
}

class SearchManager {
  constructor() {
    this.results = [];
  }
  command(cmd) {
    this.cmd = cmd;
  }
  
  execute() {
    return new Promise((resolve, reject) => {
      this.cmd.execute().then((data) => {
        this.results.push(data);
        resolve(data);
      });
    });
   
  }
}

export default function Api(props) {
  return new Promise((resolve, reject) => {
    const unsplash = new Unsplash(props);
    const cmd = new SearchByName(unsplash, props);
    const searchManager = new SearchManager();
    searchManager.command(cmd);
    searchManager.execute().then((data) => {
      console.log(data);
      resolve(data);
    });
  });
}