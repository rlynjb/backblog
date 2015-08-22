/*
* REMINDER:
* We dont need to assign an ID
* Collection and Model automatically assigns primary/unique ID
* */
var PostModel = Backbone.Model.extend({
  defaults: {
    title: 'title here',
    body: 'body here'
  },
  urlRoot: localserver + "/posts"
});

var CommentModel = Backbone.Model.extend({
  defaults: {
    body: 'sample comments',
    postId: 1
  }
});
