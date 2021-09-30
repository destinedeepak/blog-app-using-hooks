import React, { Component } from 'react';
import validate from '../utils/validate';

export default class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let { errors } = this.state;
    validate(errors, name, value);
    this.setState({ [name]: value });
  };
  render() {
    let { username, email, password, errors } = this.state;
    return (
      <section className="text-center pt-14">
        <h2 className="text-4xl">Sign Up</h2>
        <button className="text-primary mt-2">Have an account?</button>
        <form>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Username"
            value={username}
          />
          <span className="text-red-500">{errors.username}</span>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Email"
            value={email}
          />
          <span className="text-red-500">{errors.email}</span>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
            placeholder="Password"
            value={password}
          />
          <span className="text-red-500 block">{errors.password}</span>
          <button className="bg-primary px-6 py-3 rounded text-white text-lg inline-block ml-108 mt-6 submit"
          type="submit"
          disabled={errors.username || errors.email || errors.password}>
            Sign Up
          </button>
        </form>
      </section>
    );
  }
}
