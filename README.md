# Search and annotate images from multiple online sources

*ammass-annotate-images* let's you search and annotate images from different image databases on the internet. At present, we support Flickr, Pexels, Pixabay, Unsplash.
Please refer to the individual licenses for terms of use.

This is a child of 20hrs weekend coding, so be aware of spaghetti code. If you just want to use the image api, have a look at my other repository [typescript-stockpile-images](https://github.com/ssaket/typescript-stockpile-images)

## Features

If you are interested in this project, please feel free to make pull requests.

- Search
  - Search Images by Name
  - Pagination support
  - Search by image (comming soon, I will use seamese-network)

- Annotatation
  - Bounding boxes (comming soon)
  - Free hand
  - OpenCV functions (not available in the UI)
  - Distributed Annotation suppport (maybe not, or in far far future)

- Format for download (comming soon)
  - SALICON
  - COCO-SEARCH-18

## Screenshots

### Landing page

![Landing Page](/demo/mainwindow.jpg)

### Search page

![Search Page](/demo/searchWindow.jpg)

### Annotate page

![Annotate Page](demo/annotate.jpg)

## TODOs

- [ ] Migrate to TypeScript
- [ ] Add img annotation metadata on the annotation page
- [ ] Improve annotation UX
- [X] add annotate page
- [ ] add search discription in search page
- [X] add OpenCV support
- [ ] add zip download -- multiple images

## Run

### `npm install` & `npm start`
