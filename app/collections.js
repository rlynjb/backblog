var CommentModel = Backbone.Model.extend({
  /*defaults: {
    body: 'sample comments',
    postId: 1
  }*/
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
    console.log('post: ', this.post.id);
  },
  url: function() {
    // this doesnt return post id.. its just the url
    console.log(this.post.url());
    return this.post.url() + "/comments";
  }
});

var PostModel = Backbone.Model.extend({
  initialize: function() {
    /*
     * we are connecting Comments collection 
     * to each post item by passing along post id
     * */
    this.comments = new CommentsCollection([], { post: this });
  },
  // a helper function
  addComment: function(text) {
    this.comments.create({ text: text });
  },
  /*defaults: {
    title: 'title here',
    body: 'body here'
  },*/
  urlRoot: localserver + "/posts"
});

var pm = new PostModel();
pm.comments.fetch();
console.log('fetching: ', pm);

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
  url: localserver + "/posts?_sort=views&_order=DESC",
  initialize: function() {
    /*
     * whenever we fetch in the collection we want to run getComments
     * and using this as the context
     * */
    this.on('reset', this.getComments, this);
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
//console.log(pc);
