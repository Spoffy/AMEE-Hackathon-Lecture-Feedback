var FeedbackPanel = React.createClass({
  render: function() {
    return (
      <div id="vote_container">
        <img id="upvote" src="/static/assets/images/upvote.svg"/>
        <img id="downvote" src="/static/assets/images/downvote.svg"/>
      </div>
    );
  }
});

