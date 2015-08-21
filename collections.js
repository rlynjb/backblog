var Posts = Backbone.Collection.extend({
  model: Post,
  url: root + "/posts",
  parse: function(response) {
    return response;
  }
});
