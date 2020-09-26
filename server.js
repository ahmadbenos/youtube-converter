const ytdl = require("ytdl-core");
const url = "https://*www.youtube.com/watch?v=rA56B4JyTgI";
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

let stream = ytdl(url);

//* MP4 FUNCTIONALITY
app.get("/downloadmp4", (req, res) => {
  let url = req.query.url;
  let itag = req.query.itag;
  let size = req.query.size;
  if (!ytdl.validateURL(url)) {
    return res.sendStatus(400);
  }
  //console.log(data.player_response.videoDetails.title);
  res.header({
    "Content-Disposition": 'attachment; filename="download.mp4"',
    "Content-length": size,
  });
  ytdl(url, {
    format: "mp4",
    filter: "video",
    quality: itag,
  }).pipe(res);
});

/* app.get("/justdownload", (req, res) => {
  let url = req.query.url;
  if (!ytdl.validateURL(url)) {
    return res.sendStatus(400);
  }

  res.header({
    "Content-Disposition": 'attachment; filename="title.mp3"',
  });
  ytdl(url, {
    format: "mp3",
    filter: "audioonly",
  }).pipe(res);
}); */

//! get video info and send to client
app.get("/onlyinfo", (req, res) => {
  let url = req.query.url;
  if (!ytdl.validateURL(url)) {
    return res.sendStatus(400);
  }

  ytdl
    .getBasicInfo(url)
    .then((data) => {
      //! get all vids with audio
      const thumbnail =
        data.player_response.videoDetails.thumbnail.thumbnails[3].url;
      const title = data.player_response.videoDetails.title;
      //console.log();
      let withAudioFormats = data.formats
        //filter the formats to video with audio only
        .filter((type) => {
          return (
            type.mimeType.includes("video") &&
            type.hasOwnProperty("audioChannels")
          );
        })
        // create new array with the needed info only
        .map((format) => {
          return {
            quality: Number(format.qualityLabel.replace("p", "")),
            itag: format.itag,
            fps: format.fps,
            size: Number(format.contentLength),
          };
        })
        // sort the formats from highest to lowest quality
        .sort((x, y) => {
          return y.quality - x.quality;
        });

      //console.log(withAudioFormats);

      res.send([withAudioFormats, thumbnail, title]);
    })
    .catch((err) => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
