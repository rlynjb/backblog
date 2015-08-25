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
  urlRoot: "http://jsonplaceholder.typicode.com" + "/posts",
  initialize: function() {
    this.comments = new CommentsCollection([], { post: this });
    //console.log('inside of post model: ', this.comments);
  }/*,
  addComment: function(text) {
    this.comments.create({ text: text });
  }*/
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
  url: "http://jsonplaceholder.typicode.com" + "/posts?_sort=views&_order=DESC"
  //initialize: function() {
    //console.log('inside of posts collection', this);
    /*
     * whenever we reset this collection
     * this could be by doing a fetch on server
     * we want to run getComments function
     * using 'this' as the context
     * */
    //this.on('reset', this.getComments, this);
    //this.getComments();
  //}
  //getComments: function() {
    /*
     * for each post that is part of this collection
     * we want to set the model.comments equal to a 
     * new CommentsCollection here
     * we need to pass as the post here as the post itself
     * */
    //this.each(function(post) {
      //post.comments = new CommentsCollection([], { post: post });
      //post.comments.fetch();
    //});
  //}
});

//var pc = new PostsCollection();
//pc.fetch();
