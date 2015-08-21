var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: root + "/posts",
  parse: function(response) {
    return response;
  }
});

/*
 * Toying with POST method.
 * it POST on backblog.firebase rather then jsonplaceholder
 * for better debuggin.
 * Might consider creating my own API, Express or rails
 * */
var BlogPostCollection = Backbone.Collection.extend({
  model: BlogPostModel,
  url: root + "/posts",
  parse: function(response) {
    return response;
  }
});
