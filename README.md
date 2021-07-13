# Search and annotate images from multiple sources

<p align="center"><img src="demo/website-designing.svg" height="256" /></p>

An image annotation tool which can also help you with on-the-fly image processing stuff. This has [Paper.js](http://paperjs.org/) and [OpenCV.js](https://docs.opencv.org/3.4/d5/d10/tutorial_js_root.html) as major dependencies.

## Introduction

ammass-annotate-images let's you search and annotate images from different sources on the internet. Please refer to the individual licenses of the sources for use.

## Features

- Search
  - Search Images by Name
  - Pagination support

- Annotatation
  - Bounding boxes
  - Free hand
  - OpenCV functions
  - Distributed Annotation suppport (maybe not)

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
- [ ] deploy on Heroku or Netlify

## Run

### `npm install` & `npm start`

#### Register to get API-KEYs at the following

- Flickr
- Unsplash
- Pexel
- Pixabay

create an `.env` file inside the root directory with following entries, `xxx` represent API-KEYs

```shell
REACT_APP_UNSPLASH_ACCESS_KEY=xxx
REACT_APP_FLICKR_CLIENT_KEY=xxx
REACT_APP_PEXELS_API_KEY=xxx
REACT_APP_PIXABAY_API_KEY=xxx
```
