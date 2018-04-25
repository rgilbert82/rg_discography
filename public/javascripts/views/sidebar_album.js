var SidebarAlbumView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.album,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($("#discography ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});
