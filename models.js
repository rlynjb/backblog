var Post = Backbone.Model.extend({
  defaults: {
    title: 'title here',
    id: 12345,
    body: 'body here'
  },
  urlRoot: root + "/posts"
});
