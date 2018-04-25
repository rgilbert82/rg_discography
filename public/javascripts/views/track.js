var TrackView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.track,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$el.find("#tracks_list"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});
