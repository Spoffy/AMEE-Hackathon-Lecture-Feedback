var Login = React.createClass({
  loginCallback: function(data) {
    this.props.onSuccess(data);
  },
  sendFormData: function(event) {
    var data = JSON.stringify({
      username: $('input[id="username"]').val()
    });
    $.ajax({
      type: "POST",
      url: "/post/login",
      data: data,
      contentType: "application/json",
      dataType: "json",
      success: this.loginCallback
    });
    event.preventDefault();
  },
  render: function() {
    return (
     <form className="pure-form pure-form-stacked">
        <fieldset>
          <label for="username">Username</label>
          <input id="username" type="email" placeholder="Email"/>
          <button id="submit" 
                  onClick={this.sendFormData}
                  className="pure-button pure-button-primary">
            Sign in
          </button>
        </fieldset>
      </form>
    );
  }
});

