var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: localserver + "/posts",
  parse: function(response) {
    return response;
  }
});
