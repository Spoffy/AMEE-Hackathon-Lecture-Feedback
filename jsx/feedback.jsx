var FeedbackPanel = React.createClass({
  setSquareSize: function(obj, size) {
    obj.css("height", size);
  },

  componentDidMount: function() {
    //Set the buttons to the correct sizes.
    var that = this;
    that.upvoteButton = $("#upvote");
    that.downvoteButton = $("#downvote");
    that.voteContainer = $("#vote_container");
    that.navbar = $("#navbar");
    that.height = 0;
    var resize = function() {
      var jWindow = $(window);
      var voteHeight = jWindow.height() * 0.85;
      var navHeight = jWindow.height() * 0.10;

      if(that.height != jWindow.height()) {
        that.voteContainer.css("height", voteHeight);
        that.navbar.css("height", navHeight);
        that.height = jWindow.height();
      }
    };
    resize();
    that.resizeTimer = setInterval(resize, 400);
  },

  componentWillUnmount: function() {
    clearInterval(this.resizeTimer);
    this.upvoteButton = null;
    this.downvoteButton = null;
    this.resizeTimer = null;
  },

  animateButton: function(button) {
    var that = this;
    that.setSquareSize(button, "44%");
    setTimeout(function() {
      that.setSquareSize(button, "49%");
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

  back: function() {
    this.props.toPreviousScreen();
  },

  submitComment: function(event) {
    var comment = $("#comment-form textarea").val();
    $.ajax({
      type: "POST",
      url: "/post/comment",
      data: JSON.stringify({comment: comment}),
      contentType: "application/json"
    });
    event.preventDefault();
  },

  render: function() {
    return (
<div>
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
  <div id="comment-form" className="center-block">
    <form className="pure-form pure-form-stacked">
      <legend className="center-block">Comment/Question</legend>
      <fieldset>
        <textarea placeholder="Enter comment here"></textarea>
      </fieldset>
      <button onClick={this.submitComment} className="pure-button pure-button-primary">Login</button>
    </form>
  </div>
  <div id="navbar">
    <img id="vote-back"
         className="pure-img"
         onClick={this.back}
         src="/static/assets/images/back_arrow.svg"/>
  </div>
</div>

    );
  }
});

