import React from "react";
import axios from "axios";

export default function Api(props) {
  axios({
    method: "get",
    url: "https://api.unsplash.com/search/photos",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
  });
  return <div></div>;
}
