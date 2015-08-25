var CommentModel = Backbone.Model.extend({});

var CommentsCollection = Backbone.Collection.extend({
  model: CommentModel,
  initialize: function(models, options) {
    /*
     * TODO:
     * do research on this, initialize/contructor method
     * I heard, Collection initialize handles its arguments different
     * from Model and Views
     * https://github.com/jashkenas/backbone/issues/661
     * */
    options = options || {};
    if(!options.post) { return; }

    this.post = options.post;
  },
  url: function() {
    //return this.post.url() + "/comments";
    return localserver + "/posts/" + this.post + "/comments";
  }
});

var PostModel = Backbone.Model.extend({
  urlRoot: localserver + "/posts",
  initialize: function() {
    /*
     * we are connecting Comments collection 
     * to each post item by passing along post id
     * */
    /*
     * this is another way of getting comments associated with this specific post
     * were not using it right now.. we'll learn about it soon though
     */
    //this.comments = new CommentsCollection([], { post: this });
  }
});

var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: localserver + "/posts?_sort=views&_order=DESC"
});
