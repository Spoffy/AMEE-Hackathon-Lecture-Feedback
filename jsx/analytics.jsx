var CommentsBox = React.createClass({
  getInitialState: function() {
    return {comments: []};
  },
  updateComments: function() {
    var that = this;
    $.ajax({
      type: "POST",
      url: "/post/comments",
      dataType: "json",
      success: function(data) {
        console.log(data);
        that.setState({comments: data});
      }
    });
  },
  componentWillMount: function() {
    this.updateComments();
  },
  createComment: function(comment) {
    return (
    <div className="comment">
      <div className="body"> {comment.question} </div>
      <div className="time"> {comment.time} </div>
    </div>
    );
  },
  generateCommentDoms: function() {
    return this.state.comments.map(this.createComment);
  },
  render: function() {
    return( 
      <div className="commentBox">
        {this.generateCommentDoms()}
      </div>
    );
  }
});

var StatsView = React.createClass({
  render: function() {
    return (
<div className="stats_root">
  <div className="stats_label">
    {this.props.name}
  </div>
  <div className="stats_value_area">
    <div className="stats_value">
      {this.props.value}
    </div>
  </div>
</div>
    );
  }
});

var Analytics = React.createClass({
  getInitialState: function() {
    return {
      period_understanding: "Pending",
      downvotes_last_period: "Pending",
      upvotes_last_period: "Pending"
    }
  },

  componentDidMount: function() {
    //Set the buttons to the correct sizes.
    var that = this;
    that.analyticsRoot = $("#analytics_root");
    that.height = 0;
    var resize = function() {
      var jWindow = $(window);

      if(that.height != jWindow.height()) {
        that.analyticsRoot.css("height", jWindow.height() * 0.95);
        that.height = jWindow.height();
      }
    };
    resize();
    that.resizeTimer = setInterval(resize, 400);

    var updateDisplay = function() {
      $.post("/post/analytics", null,
        function(data) {
          that.setState({
            period_understanding: data.period_understanding,
            downvotes_last_period: data.downvotes_last_period,
            upvotes_last_period: data.upvotes_last_period,
            passed_warning_threshold: data.passed_warning_threshold,
            vote_lifetime: data.vote_lifetime
          });
        },
        "json"
      );
    };
    updateDisplay();
    setInterval(updateDisplay, 500);
  },

  render: function() {
    return (
    
<div id="analytics_root">
   
  <div id="data_container" className="analytics">
    <img id="status-moodle" className="center-block pure-img" src= 
      {this.state.passed_warning_threshold?
        "/static/assets/images/lost_icon.svg" :
        "/static/assets/images/understanding_icon_v2.svg"} />
    <CommentsBox />
    
    <img id='analytics-back' className="pure-img"
         src="/static/assets/images/back_arrow.svg"
         onClick={this.props.toPreviousScreen}/>
  </div>
</div>
    
    );
  }
});
