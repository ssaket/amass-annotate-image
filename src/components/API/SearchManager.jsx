import Unsplash from "./Unsplash"
import Flickr from "./Flickr"

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
      }, (error) => {
        reject(error);
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
      resolve(data);
    }, (error) => 
    console.error(error));
  });
}