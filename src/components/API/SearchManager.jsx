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
    this.name = 'search_by_name';
    this.searchTerm = searchTerm;
    this.executionResults = [];
    this.cachedData = null;
  }

  execute(cached=false) {
    console.log("hello");
    if(!cached){
      this.recv.forEach(recv => {
        this.executionResults.push(recv.searchByName(this.searchTerm));
      });
      return Promise.all(this.executionResults);
    }
    else{
      return new Promise((resolve, reject) => resolve(this.cachedData));
    }
    
  }

  setCachedData(data){
    this.cachedData = data;
  }
}

class SearchByTag extends Commands {
  constructor(recv) {
    super(recv);
    this.recv = recv;
    this.name = 'search_by_tag';
  }
  execute() {
    this.recv.action();
  }
}

class SearchManager {
  constructor() {
    this.commands = [];
  }
  command(cmd) {
    this.currentCmd = cmd;
  }
  
  execute() {
    return new Promise((resolve, reject) => {
      let cached = false;
      for(let cmd of this.commands){
        if(cmd.name === this.currentCmd.name && cmd.searchTerm === this.currentCmd.searchTerm){
          cached = true;
          this.currentCmd = cmd;
          break;
        }
      }
      
      this.commands.push(this.currentCmd);

      this.currentCmd.execute(cached).then((data) => {
          this.currentCmd.setCachedData(data);
          resolve(data.flat());
      }, (error) => {
        reject(error);
      });
    });
   
  }
}

export const searchManager = new SearchManager();

export default function Api(props) {
  return new Promise((resolve, reject) => {
    const unsplash = new Unsplash(props);
    const flickr = new Flickr(props);

    const cmd = new SearchByName([unsplash, flickr], props);
    searchManager.command(cmd);
    searchManager.execute().then((data) => {
      resolve(data);
    }, (error) => 
    console.error(error));
  });
}