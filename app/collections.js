var CommentModel = Backbone.Model.extend({
  /*defaults: {
    body: 'sample comments',
    postId: 1
  }*/
});

var CommentsCollection = Backbone.Collection.extend({
  /*
   * One of the options is the Parent model that will hold this collection
   * */
  initialize: function(models, options) {
    /*
     * TODO:
     * do research on this, initialize/contructor method
     * I heard, Collection initialize handles its arguments different
     * from Model and Views
     * https://github.com/jashkenas/backbone/issues/661
     * */
    /*
     * REMINDER:
     * it sets a default for the incoming parameters
     * */
    options = options || {};
    if(!options.post) { return; }

    this.post = options.post;
  },
  url: function() {
    return this.post.url() + "/comments";
  },
  model: CommentModel
});

var PostModel = Backbone.Model.extend({
  initialize: function() {
    /*
     * we are connecting Comments collection 
     * to each post item by passing along post id
     * */
    this.comments = new CommentsCollection([], { post: this });
  },
  /*defaults: {
    title: 'title here',
    body: 'body here'
  },*/
  //urlRoot: localserver + "/posts"
});
/*
var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: localserver + "/posts?_sort=views&_order=DESC",
  parse: function(response) {
    return response;
  }
});*/
