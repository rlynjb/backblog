// HOME page
var HomePageView = Backbone.View.extend({
  id: "home-page",
  template: _.template( $('#home-page').html() ),
  initialize: function() {
    $("#content").html( this.el );
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
  }
});

/* 
 * TODO:
 * PostsView may need to be altered to fit with new
 * Router and other pages
 * Find a way to keep Views and Templates organized
*/
// ABOUT page
var AboutPageView = Backbone.View.extend({
  id: "about-page",
  template: _.template( $('#about-page').html() ),
  initialize: function() {
    $("#content").html( this.el );
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
  }
});

// ---------------------------

// BLOG POST page
var PostPageView = Backbone.View.extend({
  id: "post-page",
  template: _.template( $('#post-page').html() ),
  initialize: function() {
    $('#content').html( this.el );
    this.render();
  },
  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);

    // render subviews that are inside of this parent view
    var commentListWrapper = new CommentListWrapperView();

    return this;
  }
});

// ----------------------------

// NEW BLOG POST page
var NewPostPageView = Backbone.View.extend({
  id: "new-post-page",
  tagName: 'form',
  template: _.template( $('#new-post-page').html() ),
  initialize: function() {
    $("#content").html( this.el );
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
    return this;
  },
  events: {
    "click #submitPost": "submitPost"
  },
  submitPost: function(e) {
    var postAttr = {
      title: $('#postTitle').val(),
      body: $('#postText').val()
    }
    /*
     * This works but it seems HACKY to me
     * coz we are re-instantiating PostsCollection and BlogRouter
     * There must be a proper backbonejs way
     * */
    var g = new PostsCollection();
    var f = new BlogRouter();
    g.create(
      postAttr,
      {
        success: function(a,b,c) {
          console.log('success');
          f.navigate('', {trigger:true});
        },
        error: function() {
          console.log('error');
        }
      }
    );
    console.log(g);
  }
});
