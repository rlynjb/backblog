// converts underscores' template syntax to {{ }}
_.templateSettings = {
       interpolate: /\{\{(.+?)\}\}/g
};

$(function() {
  var url = "https://backblog.firebaseio.com",
      root = "http://jsonplaceholder.typicode.com";

  // --------------------------------------------------------------

  var BlogRouter = Backbone.Router.extend({
    routes: {
      "about" : "showAbout"
    },
    showAbout: function() {
      console.log('show about page');
    }
  });
  var blogrouter = new BlogRouter();
  //blogrouter.on('route:showAbout');
  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();

  // --------------------------------------------------------------

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

  // View wrapper to render view child items
  var PostsView = Backbone.View.extend({
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
  // Best practice to set data on instance so view can be reusable
  var postsview = new PostsView({
    collection: new Posts(),
    el: '#main'
  });


  var PostView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( $('#postitem').html() ),
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
    showPost: function() {
      console.log('post in detail: ' + this.model.id);
    }
  });

});
