// NOTE:
// Transfer code from showPost router here
// its best practice for router and to avoid clutter
// WAS transferring code but came across an Event issue with listenTo
var blogController = {
  showBlogPost: function(id, e) {
    var blogPost = new PostModel({id:id});
    blogPost.fetch();
    e.listenTo( blogPost, 'sync', function() {
      e.view = new PostPageView({ model: blogPost});
    });
  }
}

// --------------------------------------------------------------

var BlogRouter = Backbone.Router.extend({
  routes: {
    "": "showHome",
    "about": "showAbout",
    "post/:id": "showPost",
    "new": "newPost"
  },
  showHome: function() {
    this.view = new HomePageView();

    // Best practice to set data on instance so view can be reusable
    var postsview = new PostsView({
      collection: new PostsCollection(),
      el: '#main'
    });  
  },
  showAbout: function() {
    this.view = new AboutPageView();
  },
  showPost: function(id) {
    // Best pratice:
    // Avoid this chunk of functional code in router
    // It is best to keep code minimal so it doesnt clutter router
    // *Also avoid instantiating inside router
    // Instead, create a Controller and call controller method from router
    var e = this;
    blogController.showBlogPost(id, e);
  },
  newPost: function() {
    this.view = new NewPostPageView();
  }
});
var blogrouter = new BlogRouter();
// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
