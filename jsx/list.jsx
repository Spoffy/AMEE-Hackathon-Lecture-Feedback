var List = React.createClass({
  getInitialState: function() {
    return {items: []};
  },

  componentWillMount: function() {
    var that = this;
    $.ajax({
      type: "POST",
      url: "/post/courses",
      dataType: "json",
      success: function(data) {
        that.setState({items: data});
      }
    });
  },

  itemSelected: function(name) {
    var that = this;
    $.ajax({
      method: "POST",
      url: "/post/select",
      data: JSON.stringify({"course": name}),
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        that.props.onCourseSelected(data.show_analytics);
      }
    });
  },
  createListItem: function(course) {
    var that = this;
    return (
      <li key={"listItem" + course.name} 
          className="pure-menu-item fix-onclick" 
          onClick={function() {that.itemSelected(course.name);}}>
        <a className={"pure-menu-link "
          + (course.in_progress? "in_progress" : "")}>
          {course.name}
        </a>
      </li>);
  },
  render: function() {
    var that = this;
    var menuItems = [];
    $.each(this.state.items, function(index, value) {
      menuItems.push(that.createListItem(value));
    });
    return (
      <div
        className="pure-menu pure-menu-scrollable">
        <ul className="pure-menu-list">
          {menuItems}
        </ul>
      </div>
    );
  }
});


