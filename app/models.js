/*
* REMINDER:
* We dont need to assign an ID
* Collection and Model automatically assigns primary/unique ID
* */
var PostModel = Backbone.Model.extend({
  initialize: function() {
    /*
     * we are connecting Comments collection 
     * to each post item by passing along post id
     * */
    //this.comments = new CommentsCollection([], this.id);
    this.comments = new CommentsCollection([], { post:this });
  },
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
