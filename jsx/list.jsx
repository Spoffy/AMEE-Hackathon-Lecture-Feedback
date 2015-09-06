var List = React.createClass({
  //componentDidMount: function() {
  //  $("ul > li

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
      <li key={"listItem" + name} className="pure-menu-item" 
          onClick={function() {that.itemSelected(name);}}>
        <a className="pure-menu-link">
          {name}
        </a>
      </li>);
  },
  render: function() {
    var that = this;
    var menuItems = [];
    $.each(this.props.items, function(index, value) {
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


