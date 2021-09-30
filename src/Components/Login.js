import React, { Component } from 'react';
import validate from '../utils/validate';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = this.state.errors;
    validate(errors,name, value);
    this.setState({ [name]: value });
  };
  render() {
    let { email, password, errors } = this.state;
    return (
      <section className="text-center pt-14">
        <h2 className="text-4xl">Sign In</h2>
        <button className="text-primary mt-2">Need an account?</button>
        <form>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Email"
            value={email}
          />
          <span className="text-red-500">{errors.email}</span>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Password"
            value={password}
          />
          <span className="text-red-500 block">{errors.password}</span>
          <button
            className="bg-primary px-6 py-3 rounded text-white text-lg inline-block ml-108 mt-6 submit"
            onSubmit={this.handleSubmit}
            type="submit"
            disabled ={errors.email || errors.password}
          >
            Sign In
          </button>
        </form>
      </section>
    );
  }
}
