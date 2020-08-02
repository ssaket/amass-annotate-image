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
    console.log("hello");
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
    this._sources = [ new Unsplash(), new Flickr(), new Pixabay(), new Pexels()];
  }

  get sources(){
    return this._sources;
  }

  set sources(sources){
    this._sources = sources;
  }

  addSource(source){
    if(typeof(source)!== 'string'){
      const found = this._sources.find(element => element.name === source);
      if(!found)
        this._sources.append(source);
    }
  }
  
  removeSource(name){
    const index = this._source.findIndex(element => element.name === name);
    if(index !== -1){
      this._sources.splice(index, 1);
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
          cmd.searchTerm === this.currentCmd.searchTerm
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
}

export const searchManager = new SearchManager();

export default function Api(props) {
  return new Promise((resolve, reject) => {
    console.log(searchManager.sources)
    const cmd = new SearchByName(searchManager.sources, props);
    searchManager.command(cmd);

    searchManager.execute().then(
      (data) => {
        resolve(data);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}
