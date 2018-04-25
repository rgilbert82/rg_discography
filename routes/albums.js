var path = require("path");
var fs = require('fs');
var tracks_file_path = path.resolve(path.dirname(__dirname), "data/albums");
var albums_file_path = path.resolve(path.dirname(__dirname), "data/albums.json");

function getAlbums() {
  return JSON.parse(fs.readFileSync(albums_file_path, "utf-8"));
}

function getTracks(album) {
  return JSON.parse(fs.readFileSync(tracks_file_path + "/" + album + ".json", "utf-8"));
}

function convertWhitespace(string) {
  return string.replace(/\s/g, "%20");
}

module.exports = function(router) {
  router.get('/albums/:album', function(req, res) {
    res.render('album', {
      albums: getAlbums()
    });
  });

  router.get('/albums/:album/data', function(req, res) {
    var albumName = req.params.album.replace(/^.+_/, '');
      res.send(getTracks(albumName));
  });
};
