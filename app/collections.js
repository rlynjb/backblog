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

    this.id = options.post.id;
    //console.log(options.post.id);
  },
  url: function() {
    // this returns undefined for some reason
    console.log(this.id);
    return localserver + "/posts/" + 3 + "/comments";
  },
  model: CommentModel
});
