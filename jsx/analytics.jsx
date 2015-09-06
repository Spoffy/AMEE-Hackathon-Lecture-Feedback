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
      average_understanding: "Pending",
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
            average_understanding: data.average_understanding,
            downvotes_last_period: data.downvotes_last_period,
            upvotes_last_period: data.upvotes_last_period,
            passed_warning_threshold: data.passed_warning_threshold
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
  <div id="chart_container" className="analytics">
    <img id="data-graph" className="center-block pure-img" src="/static/assets/images/data_graph.svg" />
  </div> 
  <div id="data_container" className="analytics">
    <img id="status-moodle" className="center-block pure-img" src= 
      {this.state.passed_warning_threshold?
        "/static/assets/images/lost_icon.svg" :
        "/static/assets/images/understanding_icon_v2.svg"} />
    <div className="row analytics">
      <div className="leftcol">
        <StatsView name="Average Understanding:" value={Math.round(this.state.average_understanding*100) + "%"} />
      </div>
      <div className="rightcol">
        <StatsView name="Concerns Last 20 Seconds:" value={this.state.downvotes_last_period} />
      </div>
    </div>
  </div>
</div>
    
    );
  }
});
