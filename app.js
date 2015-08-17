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
      /* 
       * filter through all items in a collection
       * for each item, create a new PostView
       * append to root element, ex. ul   
       */
      this.collection.each(function(model) {
        var postView = new PostView({ model: model });
        $('#main').append( postView.el );
      }, this);

      return this;

      // This is another way of displaying data but doesnt not
      // take advantage of Backbones' change events, etc
      // Above solution is better
      /*
      this.collection.fetch({
        success: function(a, b, c) {
          for (var k in b) {
            // get instance of model
            var post = new Post({
              title: b[k]['title'],
              body: b[k]['body']
            });

            // get instance of view and assign model
            var postView = new PostView({ model: post });

            // append in template
            // this is a hack
            $('#main').append( postView.el );
          }
        },
        error: function() {
          console.log('error');
        }
      });*/
    }
  });
  // Best practice to set data on instance so view can be reusable
  var postscollection = new Posts();
  var postsview = new PostsView({
    collection: postscollection
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
    }
  });


});
