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
  collection: new CommentsCollection(),
  initialize: function() {
    // detects the #comments outside or parent view
    this.$el.html('sample shit');

    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    /*
     * TODO:
     * go through all each comment items
     * for each item, create a view
     * append to its root element
     * filter only comments associated with post ID
     * */
    console.log(this.collection);
    /*
    this.collection.each(function(model){
      var commentItem = new CommentItemView({model:model});
      this.$el.append( commentItem.render().el );
    }, this);
    return this;
    */
  }
});


var CommentItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#comment-list').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
  }
});

var cmentwrapper = new CommentListWrapperView();
