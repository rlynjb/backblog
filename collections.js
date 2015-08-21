var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: root + "/posts",
  parse: function(response) {
    return response;
  }
});
