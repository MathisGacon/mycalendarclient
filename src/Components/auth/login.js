import React, { Component } from "react";
// import { login } from "./auth-service";
import { Link } from "react-router-dom";
import { login } from "./auth-service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    login({ username, password })
      .then(response => {
        console.log(response.data);
        this.setState({ username: "", password: "" });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <button>Submit</button>
        </form>

        <p className="account-message">
          Don't have an account yet?
          <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    );
  }
}
