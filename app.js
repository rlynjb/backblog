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
    collection: new Posts(),
    initialize: function() {
      this.render();
      /*
       * NOTE: do not remove, go back later and understand what is happening here
       * */
      /*this.listenTo(this.collection, 'sync', function() {
        console.log(this.collection);
      });*/
    },
    render: function() {
      /* 
       * STEPS:
       * do a fetch - this is equivalent to ajax get method
       * filter through all items in a collection
       * for each item, create a new PostView
       * append to root element, ex. ul   
       * */
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
      });
    }
  });
  var postsview = new PostsView();

  var PostView = Backbone.View.extend({
    model: new Post(),
    tagName: 'li',
    template: _.template( $('#postitem').html() ),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html( this.template(this.model.toJSON()) );
    }
  });
  var postview = new PostView();


});
