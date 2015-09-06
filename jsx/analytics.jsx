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
      average_understanding: 0,
      downvotes_last_period: 0,
      upvotes_last_period: 0
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
            upvotes_last_period: data.upvotes_last_period
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
  </div> 
  <div id="data_container" className="pure-g analytics">
    <div id="checkbox" className="pure-u-2-5 analytics">
    </div>
    <div id="stats" className="pure-u-3-5 analytics">
      <StatsView name="Average Understanding:" value={Math.round(this.state.average_understanding*100) + "%"} />
      <StatsView name="Upvotes Last 20 Seconds:" value={this.state.downvotes_last_period} />
    </div>
  </div>
</div>
    
    );
  }
});
