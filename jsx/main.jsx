var MainBody = React.createClass({
  getInitialState: function() {
    return {
      current_screen: 0,
      courses: []
    }
  },

  changeToCourseList: function(courses) {
    this.setState({
      current_screen: 1,
      courses: courses
    });
  },

  onCourseSelected: function(name) {
    this.setState({current_screen: 2});
  },

  render: function() {
    switch(this.state.current_screen) {
      case 0:
        return <Login onSuccess={this.changeToCourseList}/>
      case 1:
        return <List onCourseSelected={this.onCourseSelected} 
                     items={this.state.courses}/>;
      case 2:
        return <FeedbackPanel />
    }
  }
});

React.render(<MainBody />, $('#root').get(0));


