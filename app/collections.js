var CommentModel = Backbone.Model.extend({
  initialize: function() {
    console.log('comment model does run');
  }
});

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
    /*
     * REMINDER:
     * it sets a default for the incoming parameters
     * */
    //options = options || {};
    //if(!options.post) { return; }
    
    console.log('checking comment model: ', this.model);

    this.post = options.post;
    if(typeof this.post.id === 'undefined') { return; }
    this.url();
    console.log('inside of comments collection: ', this);
  },
  url: function() {
    return this.post.url() + "/" + this.post.id + "/comments";
  }
});

var PostModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com" + "/posts",
  initialize: function() {
    /*
     * we are connecting Comments collection 
     * to each post item by passing along post id
     * */
    this.comments = new CommentsCollection([], { post: this });
    console.log('inside of post model: ', this.comments);
  }
});

/*
 * NOTE:
 * there is no infrastructure that connects our Collection to Model
 * coz every Model is a js object, we can set our property
 * 
 * whenever we fetch our post collection from the server
 * we want to get the Comments for that model
 *
 * */

var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: "http://jsonplaceholder.typicode.com" + "/posts?_sort=views&_order=DESC",
  initialize: function() {
    /*
     * whenever we fetch in the collection we want to run getComments
     * and using this as the context
     * */
    console.log('inside of posts collection', this);
    this.on('reset', this.getComments, this);
    this.getComments();
  },
  getComments: function() {
    this.each(function(post) {
      post.comments = new CommentsCollection([], { post: post });
      post.comments.fetch();
    });
  }
});

var pc = new PostsCollection();
pc.fetch();
console.log('after fetched: ', pc);
