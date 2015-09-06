var FeedbackPanel = React.createClass({
  setSquareSize: function(obj, size) {
    obj.css("height", size);
    obj.css("width", size);
  },

  componentDidMount: function() {
    //Set the buttons to the correct sizes.
    var that = this;
    that.upvoteButton = $("#upvote");
    that.downvoteButton = $("#downvote");
    that.currentSize = 0;
    var resize = function() {
      var jWindow = $(window);
      var size = 0;
      if(jWindow.height() < jWindow.width() * 2) {
        size = jWindow.height()/2;
      } else {
        size = jWindow.width();
      }

      if(that.currentSize != size) {
        that.setSquareSize(that.upvoteButton, size)
        that.setSquareSize(that.downvoteButton, size)
        that.currentSize = size;
      }
    };
    resize();
    that.resizeTimer = setInterval(resize, 400);
  },

  componentWillUnmount: function() {
    clearInterval(this.resizeTimer);
    this.upvoteButton = nil;
    this.downvoteButton = nil;
    this.resizeTimer = nil;
  },

  animateButton: function(button) {
    var that = this;
    that.setSquareSize(button, that.currentSize * 0.9);
    setTimeout(function() {
      that.setSquareSize(button, that.currentSize);
    }, 200);
  },

  upvotePushed: function() {
    this.animateButton(this.upvoteButton);
    $.post("/post/upvote")
  },

  downvotePushed: function() {
    this.animateButton(this.downvoteButton);
    $.post("/post/downvote")
  },

  render: function() {
    return (

<div id="vote_container">
  <img id="upvote" 
       className="vote-button pure-img" 
       onClick={this.upvotePushed}
       src="/static/assets/images/positive_arrow.svg"/>
  <img id="downvote" 
       className="vote-button pure-img" 
       onClick={this.downvotePushed}
       src="/static/assets/images/negative_arrow.svg"/>
</div>

    );
  }
});

