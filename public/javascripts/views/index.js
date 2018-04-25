var IndexView = Backbone.View.extend({
  id: "index_view",
  template: App.templates.index,
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});
