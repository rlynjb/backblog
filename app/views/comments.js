/*
 * RECALL:
 * When thinking about Views, it is like registering 
 * a block of template/html tags.
 * METHOD:
 * - think about the item view first
 * - and then, where these items are going to output
 * */
/*
var CommentListWrapperView = Backbone.View.extend({
  id: "comment-list-wrapper",
  el: "#comments",
  collection: new CommentsCollection(),
  initialize: function() {
    // detects the #comments outside or parent view
    //this.$el.html('sample shit');

    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
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
    // Best practice to check if data is set
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
*/
