var PostModel = Backbone.Model.extend({
  defaults: {
    title: 'title here',
    body: 'body here'
  },
  urlRoot: localserver + "/posts"
});
