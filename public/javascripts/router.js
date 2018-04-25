var router = new (Backbone.Router.extend({
  routes: {
    "albums/:name": App.tracksView.bind(App)
  },
  index: function() { App.indexView(); },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({
  pushState: true
});
