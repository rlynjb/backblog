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

// View wrapper to render view child items
var PostsView = Backbone.View.extend({
  id: 'home-page',
  initialize: function() {
    // Best practice to check if data is set
    if (!this.collection) {
      console.log('Collection is not set for this view.');
    }

    // equivalent to ajax get method
    this.collection.fetch();
    // once fetched, check if collection has completely loaded
    // then run render
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    // instead of appending items via append
    // use DocumentFragment to avoid multiple DOM reflow
    //var fragment = document.createDocumentFragment();
    /* 
     * filter through all items in a collection
     * for each item, create a new PostView
     * append to root element, ex. ul   
     */
    this.collection.each(function(model) {
      var postView = new PostView({ model: model });
      //fragment.appendChild(postView).render().el;
      this.$el.append( postView.render().el );
    }, this);

    //this.$el.html(fragment);
    return this;
  }
});

var PostView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#post-items').html() ),
  initialize: function() {
    // Best practice to check if data is set
    if (!this.model) {
      console.log('Model is not set for this view.');
    }

    this.render();
  },
  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    return this;
  }/*,
  events: {
    'click .post-link': 'showPost'
  },
  showPost: function(e) {
    e.preventDefault();

    // pass these attributes to PostPage view
    console.log('title: ' + this.model.attributes['title']);
  }*/
});

// ---------------------------

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
    return this;
  }
});

// ----------------------------

// NEW BLOG POST page
var NewPostPageView = Backbone.View.extend({
  id: "new-post-page",
  template: _.template( $('#new-post-page').html() ),
  initialize: function() {
    $("#content").html( this.el );
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
  }
});
