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

var List = React.createClass({
  itemSelected: function(name) {
    this.props.onCourseSelected(name);
  },
  createListItem: function(name) {
    var that = this;
    return (<li className="pure-menu-item">
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

var Login = React.createClass({
  render: function() {
    return (
     <form className="pure-form pure-form-stacked">
        <fieldset>
          <label for="username">Username</label>
          <input id="username" type="email" placeholder="Email"/>
          <button id="submit" 
            onClick={this.props.onSuccess}
            className="pure-button pure-button-primary">
            Sign in
          </button>
        </fieldset>
      </form>
    );
  }
});

var MainBody = React.createClass({
  getInitialState: function() {
    return {
      current_screen: 0
    }
  },

  changeToCourseList: function() {
    this.setState({current_screen: 1});
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
                     items={["One", "Two", "Three"]}/>;
      case 2:
        return <FeedbackPanel />
    }
  }
});

React.render(<MainBody />, $('#root').get(0));


