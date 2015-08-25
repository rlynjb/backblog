var CommentModel = Backbone.Model.extend({
  initialize: function() {
    //console.log('comment model does run');
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

    this.post = options.post;
    if(typeof this.post.id === 'undefined') { return; }
    //this.url();
    //console.log('inside of comments collection: ', this);
  },
  url: function() {
    return this.post.url() + "/comments";
  }
});

var PostModel = Backbone.Model.extend({
  //urlRoot: "http://jsonplaceholder.typicode.com" + "/posts",
  initialize: function() {
    this.comments = new CommentsCollection([], { post: this });
    //console.log('inside of post model: ', this.comments);
  },
  addComment: function(text) {
    this.comments.create({ text: text });
  }
});

/*
 * NOTE:
 * there is no Backbone infrastructure that connects our Collection to Model
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
    //console.log('inside of posts collection', this);
    this.on('reset', this.getComments, this);
    this.getComments();
  },
  getComments: function() {
    var g = new CommentsCollection([], { comments: post });
    g.fetch();
    console.log(g);
    /*
    this.each(function(comments) {
      console.log(comments);
      comments.comments = new CommentsCollection([], { comments: comments });
      comments.comments.fetch();
    });
    */
  }
});

var pc = new PostsCollection();
pc.fetch();
//console.log('after fetched: ', pc);
