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
    this.props.onCourseSelected(name);
    $.ajax({
      method: "POST",
      url: "/post/select",
      data: JSON.stringify({"course": name}),
      contentType: "application/json"
    });
  },
  createListItem: function(name) {
    var that = this;
    return (
      <li key={"listItem" + name} className="pure-menu-item fix-onclick" 
          onClick={function() {that.itemSelected(name);}}>
        <a className="pure-menu-link">
          {name}
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


