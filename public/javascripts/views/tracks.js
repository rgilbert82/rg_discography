var TracksView = Backbone.View.extend({
  id: "album_wrapper",
  template: App.templates.tracks,
  events: {
    "click a.track": "triggerTrackChange",
    "click #tracks_list div": "triggerTrackChange",
  },
  triggerTrackChange: function(e) {
    e.preventDefault();

    var player = App.$musicPlayer[0];
    var trackSource = e.target.getAttribute("data-stream");

    if (player.src !== trackSource) {
      App.changeTrackAndPlay(trackSource);
    } else if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  },
  showSidebarAlbums: function() {
    $("#discography").css("display", "block");
  },
  render: function() {
    this.$el.html(this.template(this.model));
    App.$el.html(this.$el);
  },
  initialize: function() {
    if (!App.tracks) {
      App.loadAppFromAlbumPage.call(App);
    }

    this.render();
    this.showSidebarAlbums();
    this.model.view = this;
  }
});
