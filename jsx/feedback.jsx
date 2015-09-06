var FeedbackPanel = React.createClass({
  componentDidMount: function() {
    //Set the buttons to the correct sizes.
    var upvoteButton = $("#upvote");
    var downvoteButton = $("#downvote");
    var lastSize = 0;
    var resize = function() {
      var jWindow = $(window);
      var size = 0;
      if(jWindow.height() < jWindow.width() * 2) {
        size = jWindow.height()/2;
      } else {
        size = jWindow.width();
      }

      if(lastSize != size) {
        upvoteButton.css("height", size);
        upvoteButton.css("width", size);
        downvoteButton.css("height", size);
        downvoteButton.css("width", size);
        lastSize = size;
      }
    };
    resize();
    this.resizeTimer = setInterval(resize, 400);
  },

  componentWillUnmount: function() {
    clearInterval(this.resizeTimer);
  },

  render: function() {
    return (

<div id="vote_container">
  <img id="upvote" className="center-block pure-img" src="/static/assets/images/positive_arrow.svg"/>
  <img id="downvote" className="center-block pure-img" src="/static/assets/images/negative_arrow.svg"/>
</div>

    );
  }
});

