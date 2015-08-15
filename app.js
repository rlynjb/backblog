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
            var post = new Post({
              title: b[k]['title'],
              body: b[k]['body']
            });

            var postView = new PostView({ model: post });
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
  //console.log(postView);

  /*
  var PostListView = Backbone.View.extend({
    tagName: "li",
    template: _.template("<a href='/posts/<%= id %>'><%= title %></a>"),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html( this.template(this.model.toJSON()) );
    }
  });

  var PostsListView = Backbone.View.extend({
    tagName: 'ul',
    template: _.template("<h1>My Blog</h1><ul></ul>"),
    render: function () {
      this.el.innerHTML = this.template();
      var ul = this.$el.find("ul");
      this.collection.forEach(function (post) {
        ul.append(new PostListView({
          model: post
        }).render().el);
      });
      return this;
    }
  });

  var posts = new Posts();
  $("#main").append(new PostsListView({
    collection: posts
  }).render().el);
  */
  //var newsItems = new PostsListView({ el: $("#main") });

});
