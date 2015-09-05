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

<div>
  <img src="/static/assets/images/logo.jpg"
       className="pure-img center-block"
       id="login-logo"/>

  <div className="pure-g">
    <form className="center-text pure-form pure-form-stacked">
      <fieldset>
        <label className="pure-u-5-5 center-block" for="username">Username</label>
        <input className="pure-u-5-5 center-block" id="username" type="email" placeholder="Email"/>
        <button id="submit" 
                onClick={this.sendFormData}
                className="pure-u-2-5 pure-button pure-button-primary">
          Sign in
        </button>
      </fieldset>
    </form>
  </div>
</div>

    );
  }
});

