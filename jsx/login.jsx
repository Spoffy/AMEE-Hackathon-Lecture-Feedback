var List = React.createClass({
  render: function() {
    return (
      <div
        className="pure-menu pure-menu-scrollable">
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link">
              Course
            </a>
          </li>
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link">
              Course
            </a>
          </li>
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

  render: function() {
    switch(this.state.current_screen) {
      case 0:
        return <Login onSuccess={this.changeToCourseList}/>
      case 1:
        return <List />;
    }
  }
});

React.render(<MainBody />, $('#root').get(0));


