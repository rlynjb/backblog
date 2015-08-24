var PostsCollection = Backbone.Collection.extend({
  model: PostModel,
  url: localserver + "/posts?_sort=views&_order=DESC",
  parse: function(response) {
    return response;
  }
});


var CommentsCollection = Backbone.Collection.extend({
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
    // this returns undefined for some reason
    //console.log('from commentcollection: ', this.post.url());
    return this.post.url() + "/comments";
  },
  model: CommentModel
});

var c = new CommentsCollection();
console.log(c);

var p = new PostModel({id:4});
console.log(p.comments.url());
p.fetch({
  success: function(a,b,c) {
    console.log(a);
    console.log(b)
  }
});
//console.log(p);
