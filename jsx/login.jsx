var Login = React.createClass({
  loginCallback: function() {
    this.props.onSuccess();
  },
  sendFormData: function(event) {
    var data = JSON.stringify({
      email: $('input[id="email"]').val()
    });
    $.ajax({
      type: "POST",
      url: "/post/login",
      data: data,
      contentType: "application/json",
      success: this.loginCallback
    });
    event.preventDefault();
  },
  render: function() {
    return (

<div>
  <img src="/static/assets/images/lec_loop_v2.svg"
       className="pure-img center-block"
       id="login-logo"/>

  <div className="pure-g">
    <form className="pure-u-5-5 center-text pure-form pure-form-stacked">
      <fieldset>
        <label className="pure-u-5-5 center-block" for="email">Username</label>
        <input className="pure-u-5-5 center-block" id="email" type="email" placeholder="Email"/>
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

