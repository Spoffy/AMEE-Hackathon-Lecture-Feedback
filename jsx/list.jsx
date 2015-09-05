var List = React.createClass({
  itemSelected: function(name) {
    this.props.onCourseSelected(name);
  },
  createListItem: function(name) {
    var that = this;
    return (<li key={"listItem" + name} className="pure-menu-item">
      <a onClick={function() {that.itemSelected(name);}}
         className="pure-menu-link">
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


