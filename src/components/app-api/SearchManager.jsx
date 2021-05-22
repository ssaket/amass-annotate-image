import Unsplash from "./Unsplash";
import Flickr from "./Flickr";
import Pixabay from "./Pixabay";
import Pexels from "./Pexels";

class Commands {
  constructor(recv) {
    this.recv = recv;
    this.cachedData = null;
    this.executionResults = [];
    if (new.target === Commands) {
      throw "Can't create object of the abstract class";
    }
  }
  execute() {}
}

class SearchByName extends Commands {
  constructor(recv, searchTerm) {
    super(recv);

    this.name = "search_by_name";
    this.searchTerm = searchTerm;
  }

  execute(cached = false) {
    if (!cached) {
      this.recv.forEach((recv) => {
        this.executionResults.push(recv.searchByName(this.searchTerm));
      });
      return Promise.all(this.executionResults);
    } else {
      return Promise.resolve(this.cachedData);
    }
  }

  setCachedData(data) {
    this.cachedData = data;
  }
}

class SearchByTag extends Commands {
  constructor(recv) {
    super(recv);

    this.name = "search_by_tag";
  }
  execute() {
    this.recv.action();
  }
}

class SearchManager {
  constructor() {
    this._commands = [];
    this._sources = [];
    console.info("Search Manager has been created, please add sources now");
  }

  get sources() {
    return this._sources;
  }

  set sources(sources) {
    this._sources = sources;
  }

  reset(){
    this._commands = [];
    this._sources = [];
  }

  addSource(source) {
    if (typeof source !== "string") {
      const found = this._sources.find((element) => element.name === source);
      if (!found) this._sources.push(source);
    } else {
      const sourceObj = this.createSourceObject(source);
      this._sources.push(sourceObj);
    }
  }

  removeSource(name) {
    const index = this._sources.findIndex(
      (element) => element.name === name.toLowerCase()
    );
    if (index !== -1) {
      this._sources.splice(index, 1);
    }
  }

  createSourceObject(name) {
    switch (name.toLowerCase()) {
      case "unsplash":
        return new Unsplash();
      case "pexels":
        return new Pexels();
      case "pixabay":
        return new Pixabay();
      case "flickr":
        return new Flickr();
      default:
        return null;
    }
  }

  command(cmd) {
    this.currentCmd = cmd;
  }

  execute() {
    return new Promise((resolve, reject) => {
      let cached = false;
      for (let cmd of this._commands) {
        if (
          cmd.name === this.currentCmd.name &&
          cmd.searchTerm === this.currentCmd.searchTerm &&
          cmd.recv.length === this.currentCmd.recv.length &&
          cmd.recv.filter((value) => !this.currentCmd.recv.includes(value))
            .length > 0
        ) {
          cached = true;
          this.currentCmd = cmd;
          break;
        }
      }

      this._commands.push(this.currentCmd);

      this.currentCmd.execute(cached).then(
        (data) => {
          this.currentCmd.setCachedData(data);
          resolve(data.flat());
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getImagesByName(name) {
    if(this.sources.length === 0){
      console.error("No sources, please add source to search");
      return;
    }
    return new Promise((resolve, reject) => {
      const cmd = new SearchByName(this.sources, name);
      this.command(cmd);
  
      this.execute().then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
}

export const ImageSearchManager = new SearchManager();
