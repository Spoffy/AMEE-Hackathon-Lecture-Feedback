var MainBody = React.createClass({
  getInitialState: function() {
    return {
      current_screen: 0,
      courses: []
    }
  },

  changeToCourseList: function() {
    this.setState({
      current_screen: 1,
    });
  },

  onCourseSelected: function(show_analytics) {
    if (show_analytics) {
      this.setState({current_screen: 3});
    } else {
      this.setState({current_screen: 2});
    }
  },

  render: function() {
    switch(this.state.current_screen) {
      case 0:
        return <Login onSuccess={this.changeToCourseList}/>
      case 1:
        return <List onCourseSelected={this.onCourseSelected}/>;
      case 2:
        return <FeedbackPanel toPreviousScreen={this.changeToCourseList} />
      case 3:
        return <Analytics />
    }
  }
});

React.render(<MainBody />, $('#root').get(0));


