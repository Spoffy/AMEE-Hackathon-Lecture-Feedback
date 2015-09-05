var MainBody = React.createClass({
  render: function() {
    return (
      <form className="pure-form pure-form-stacked">
        <fieldset>
          <label for="username">Username</label>
          <input id="username" type="email" placeholder="Email"/>
          <button id="submit" className="pure-button pure-button-primary">Sign in</button>
        </fieldset>
      </form>
    );
  }
});

React.render(<MainBody />, $('#root').get(0));


