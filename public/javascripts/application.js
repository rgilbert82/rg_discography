var App = {
  templates: JST,
  $el: $("#content"),
  $main: $("main"),
  $musicPlayer: $("audio"),
  indexView: function() {
    this.index = new IndexView();
    this.renderAlbums();
    this.renderSidebarAlbums();
    this.hideSidebarAlbums();
    this.setupDefaultAlbumState();
    $('html, body').scrollTop(0);
  },
  loadAppFromAlbumPage: function() {
    this.renderSidebarAlbums();
    this.setupDefaultAlbumState();
    $('html, body').scrollTop(0);
  },
  tracksView: function(albumName) {
    var scriptUrl = '/albums/' + albumName + "/data";
    var self = this;

    this.setCurrentAlbum(albumName);
    if (!this.album) {
      return this.renderErrorView();
    }

    this.renderTracksView(this.album);
    this.tracks.fetch({
      url: scriptUrl,
      success: function() {
        self.renderTracks();
        self.loadFirstTrackOfSelectedAlbum();
        self.setupPlayPauseIcons();
      }
     });

     $('html, body').scrollTop(0);
  },
  renderErrorView: function() {
    new ErrorView();
  },
  renderAlbums: function() {
    this.albums.each(this.renderAlbumView);
  },
  renderSidebarAlbums: function() {
    $("#discography ul").find("li").length === 0 &&
    this.albums.each(this.renderSidebarAlbumView);
  },
  renderTracks: function() {
    $("#tracks_list").html("");
    this.tracks.each(this.renderTrackView);
  },
  renderAlbumView: function(album) {
    new AlbumView({
      model: album
    });
  },
  renderSidebarAlbumView: function(album) {
    new SidebarAlbumView({
      model: album
    });
  },
  renderTracksView: function(album) {
    new TracksView({
      model: album
    });
  },
  renderTrackView: function(track) {
    new TrackView({
      model: track
    })
  },
  renderToCanvases: function() {
    renderBackgroundImage();
    if($(window).width() > 740) {
      visualizer();
    }
  },
  hideSidebarAlbums: function() {
    $("#discography").css("display", "none");
  },
  setupDefaultAlbumState: function() {
    var self = this;
    var visualizerIsSet = true;

    if (!this.tracks) {
      this.tracks = new Tracks();
      visualizerIsSet = false;
    }

    if (this.$musicPlayer[0].paused) {
      this.tracks.fetch({
        url: "/albums/" + this.albums.toJSON()[0].title + "/data",
        success: function() {
          self.setupMusicPlayer();
          self.createPlaylist();
          if (!visualizerIsSet) {
            self.renderToCanvases();
          }
        }
      });
    }
  },
  setCurrentAlbum: function(albumName) {
    this.album = this.albums.toJSON().filter(function(a) {
      return a.title === albumName;
    })[0];
  },
  createPlaylist: function() {
    var self = this;
    var isTrackInPlaylist = this.playlist &&
                            this.playlist.filter(function(track) {
                              return track.link === self.$musicPlayer[0].src;
                            }).length > 0;

    if (!isTrackInPlaylist) {
      this.playlist = this.tracks.toJSON().slice();
    }
  },
  loadFirstTrackOfSelectedAlbum: function() {
    var firstTrack = this.tracks.toJSON()[0].link;

    if (this.$musicPlayer[0].paused || this.$musicPlayer[0].ended || this.$musicPlayer[0].time === 0) {
      this.changeTrack(firstTrack);
    }
  },
  nextTrack: function() {
    var trackURL = this.$musicPlayer[0].src;
    var trackURLs = App.playlist.map(function(e) { return e.link; });
    var idx = trackURLs.indexOf(trackURL) + 1;

    if (trackURLs[idx]) {
      this.changeTrackAndPlay(trackURLs[idx]);
    }
  },
  playTrackIfLoaded: function() {
    var self = this;
    var count = 0;

    function audioIsReady() {
      if (self.$musicPlayer[0].readyState !== 4 && count < 10) {
        count++;
        window.setTimeout(audioIsReady, 500);
      } else {
        self.$musicPlayer[0].play();
      }
    }

    audioIsReady();
  },
  changeTrack: function(trackSource) {
    this.$musicPlayer.attr({
      "src": trackSource
    });

    this.createPlaylist();
    this.getTrackTitle();
  },
  changeTrackAndPlay: function(trackSource) {
    this.changeTrack(trackSource);
    this.playTrackIfLoaded();
  },
  setupPlayPauseIcons: function() {
    if (!this.$musicPlayer[0].paused) {
      this.setCurrentlyPlayingIcon();
    } else {
      this.setCurrentlyLoadedIcon();
    }
  },
  resetAllIcons: function() {
    $("#tracks_list").find("div").removeClass("pause_icon play_icon_current").addClass("play_icon");
  },
  resetCurrentTrackIcon: function(icon) {
    $("#tracks_list").find("div[data-stream=\"" + App.$musicPlayer[0].src +
    "\"]").removeClass().addClass(icon);
  },
  setCurrentlyPlayingIcon: function() {
    this.resetAllIcons();
    this.resetCurrentTrackIcon("pause_icon");
  },
  setCurrentlyLoadedIcon: function() {
    this.resetAllIcons();
    this.resetCurrentTrackIcon("play_icon_current");
  },
  setupMusicPlayer: function() {
    var firstTrackOfAlbum = this.tracks.toJSON()[0];

    this.$musicPlayer.attr({
      "crossOrigin": "anonymous",
      "src": firstTrackOfAlbum.link,
      "controls": "true",
    });

    $("#current_track_title").text(firstTrackOfAlbum.title);
  },
  getTrackTitle: function() {
    var trackURL = this.$musicPlayer[0].src;
    var trackTitle = this.playlist.filter(function(track) {
      return track.link === trackURL; })[0].title;

    $("#current_track_title").text(trackTitle);
  },
  bindEvents: function() {
    this.$musicPlayer.on("ended", this.nextTrack.bind(this));
    this.$musicPlayer.on("play", this.setCurrentlyPlayingIcon.bind(this));
    this.$musicPlayer.on("pause", this.setCurrentlyLoadedIcon.bind(this));
    this.$main.on("click", ".album_link", function(e) {
      e.preventDefault();
      var albumName = $(e.currentTarget).find("h2").text();
      router.navigate("albums/" + albumName, { trigger: true });
    });

    this.$main.on("click", ".back_to_home", function(e) {
      e.preventDefault();
      router.navigate("/", { trigger: true });
    });

    $("footer").on("click", "a", function(e) { e.preventDefault(); });
  }
};

_.extend(App, Backbone.Events);

App.bindEvents();
