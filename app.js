// converts underscores' template syntax to {{ }}
_.templateSettings = {
       interpolate: /\{\{(.+?)\}\}/g
};

$(function() {
  var url = "https://backblog.firebaseio.com",
      root = "http://jsonplaceholder.typicode.com";

  var Post = Backbone.Model.extend({
    defaults: {
      title: 'title here',
      id: 12345,
      body: 'body here'
    }
  });

  var Posts = Backbone.Collection.extend({
    model: Post,
    url: root + "/posts",
    parse: function(response) {
      return response;
    }
  });

  // --------------------------------------------------------------

  // HOME page
  var Home = Backbone.View.extend({
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
    },
    events: {
      'click .post-link': 'showPost'
    },
    showPost: function(e) {
      e.preventDefault();
      console.log('post in detail: ' + this.model.id);
    }
  });

  // ---------------------------

  // BLOG POST page
  var PostPage = Backbone.View.extend({
    //id: "post-page",
    //template: _.template( $('#post-page').html() ),
    initialize: function() {
      console.log('post page has loaded');
      //$('#content').html( this.el );
      //this.render();
    },
    //render: function() {
      //this.$el.html( this.template );
    //}
  });

  // ---------------------------

  /* 
   * TODO:
   * PostsView may need to be altered to fit with new
   * Router and other pages
   * Find a way to keep Views and Templates organized
  */
  // ABOUT page
  var About = Backbone.View.extend({
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

  // --------------------------------------------------------------

  var BlogRouter = Backbone.Router.extend({
    routes: {
      "": "showHome",
      "about": "showAbout",
      "post/:id": "showPost"
    },
    showHome: function() {
      var home = new Home();

      // Best practice to set data on instance so view can be reusable
      var postsview = new PostsView({
        collection: new Posts(),
        el: '#main'
      });  
    },
    showAbout: function() {
      this.view = new About();
    },
    showPost: function(id) {
      /*
       * TODO:
       * attempting to display individual blog post page
       * in a view
       * */
      this.view = new PostPage();
    }
  });
  var blogrouter = new BlogRouter();
  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();

});
