const http = require("http");

function YouTube (apiKey) {
  this.apiKey = apiKey;
  console.info('youtube api loaded');
}

YouTube.prototype.listMostPopular = function(){

  return new Promise((resolve, reject) => {
    http
      .request(
        'https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet&maxResults=50&key=' + this.apiKey,
        res => {
          let data = "";
          res.on("data", d => {
            data += d;
          });
          res.on("end", () => {
            data = JSON.parse(data);
            resolve(data);
          });
        }
      )
      .end();
  });
};

export default YouTube;
