const fetch = require("node-fetch");
const fs = require("fs");
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  const downloadLinks = data.map((item) => item.urls.regular);
  fs.writeFile("test1.txt", downloadLinks.toString(), function (err) {
    if (err) {
      console.log(err);
    }
  });
};
const url =
  "https://api.unsplash.com/photos/random?content_filter=high&count=30&client_id=https://api.unsplash.com/photos/random?content_filter=high&count=20&client_id=iUjrzj1dVUdD-eEJtYbmsgqz-9wY0pjQ3Wjwg0uijNg";
// const url = "https://jsonplaceholder.typicode.com/posts";
fetchData(url);
