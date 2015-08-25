/*
 * RECALL:
 * When thinking about Views, it is like registering 
 * a block of template/html tags.
 * METHOD:
 * - think about the item view first
 * - and then, where these items are going to output
 * */

var CommentListWrapperView = Backbone.View.extend({
  id: "comment-list-wrapper",
  el: "#comments",
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.each(function(model){
      var commentItem = new CommentItemView({ model: model });
      this.$el.append( commentItem.render().el );
    }, this);
    return this;
  }
});

var CommentItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#comment-list').html() ),
  initialize: function() {
    if (!this.model) {
      console.log('Model is not set for this view.');
    }
    this.render();
  },
  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );
    return this;
  }
});

var CommentFormView = Backbone.View.extend({
  el: "#commentForm",
  template: _.template( $('#comment-form').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
    return this;
  },
  events: {
    "click #submitComment": "submitComment"
  },
  submitComment: function() {
    var postAttr = {
      postId: 'magic post id number here',
      name: $('#cmtName').val(),
      body: $('#cmtText').val()
    }

    /*
     * This works but it seems HACKY to me
     * coz we are re-instantiating PostsCollection and BlogRouter
     * There must be a proper backbonejs way
     * */
    var g = new CommentsCollection();
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
