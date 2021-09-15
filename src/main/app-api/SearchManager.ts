import Unsplash from "./Unsplash";
import Flickr from "./Flickr";
import Pixabay from "./Pixabay";
import Pexels from "./Pexels";
import { AnyMxRecord } from "dns";

class Commands {
  recv: any;
  catchData: any;
  executionResults: any;

  constructor(recv: any) {
    this.recv = recv;
    this.catchData = null;
    this.executionResults = [];
    if (new.target === Commands) {
      throw "Can't create object of the abstract class";
    }
  }
  execute() {}
}

class SearchByName extends Commands {

  name: any;
  searchTerm: any; 

  constructor(recv: any, searchTerm: any) {
    super(recv);

    this.name = "search_by_name";
    this.searchTerm = searchTerm;
  }

  execute(cached = false) {
    if (!cached) {
      this.recv.forEach((recv: { searchByName: (arg0: any) => any; }) => {
        this.executionResults.push(recv.searchByName(this.searchTerm));
      });
      return Promise.all(this.executionResults);
    } else {
      return Promise.resolve(this.catchData);
    }
  }

  setcatchData(data: any) {
    this.catchData = data;
  }
}

class SearchByTag extends Commands {
  name: any;

  constructor(recv: any) {
    super(recv);

    this.name = "search_by_tag";
  }
  execute() {
    this.recv.action();
  }
}

class SearchManager {
  commands: any;
  sources: any;
  currentCmd: any;

  constructor() {
    this.commands = [];
    this.sources = [];
    console.info("Search Manager has been created, please add sources now");
  }

  reset(){
    this.commands = [];
    this.sources = [];
  }

  addSource(source: string) {
    if (typeof source !== "string") {
      const found = this.sources.find((element: { name: any; }) => element.name === source);
      if (!found) this.sources.push(source);
    } else {
      const sourceObj = this.createSourceObject(source);
      this.sources.push(sourceObj);
    }
  }

  removeSource(name: string) {
    const index = this.sources.findIndex(
      (element: { name: any; }) => element.name === name.toLowerCase()
    );
    if (index !== -1) {
      this.sources.splice(index, 1);
    }
  }

  createSourceObject(name: string) {
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

  command(cmd: SearchByName) {
    this.currentCmd = cmd;
  }

  execute() {
    return new Promise((resolve, reject) => {
      let cached = false;
      for (let cmd of this.commands) {
        if (
          cmd.name === this.currentCmd.name &&
          cmd.searchTerm === this.currentCmd.searchTerm &&
          cmd.recv.length === this.currentCmd.recv.length &&
          cmd.recv.filter((value: any) => !this.currentCmd.recv.includes(value))
            .length > 0
        ) {
          cached = true;
          this.currentCmd = cmd;
          break;
        }
      }

      this.commands.push(this.currentCmd);

      this.currentCmd.execute(cached).then(
        (data: any[]) => {
          this.currentCmd.setcatchData(data);
          resolve(data.flat());
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  getImagesByName(name: string) {
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
