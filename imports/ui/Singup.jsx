import React from 'react';
import { Link } from "react-router";
import {Accounts} from "meteor/accounts-base";

export default class Singup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if(password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters'});
    }

    Accounts.createUser({email, password}, (err) => {
      if(err) {
        console.log(err);
        this.setState({error: err.reason});
      } else {
        this.setState({error: undefined});
      }
    });

  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
          <div>{!this.state.error ? undefined : <p>{this.state.error}</p>}</div>

          <form onSubmit={this.onSubmit.bind(this)} noValidate={true} className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account</Link>
        </div>
      </div>
    )
  }
}
