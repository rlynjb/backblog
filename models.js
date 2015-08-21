var PostModel = Backbone.Model.extend({
  defaults: {
    title: 'title here',
    id: 12345,
    body: 'body here'
  },
  urlRoot: root + "/posts"
});


var BlogPostModel = Backbone.Model.extend({
  defaults: {
    title: 'title here',
    body: 'body here'
  }
});
