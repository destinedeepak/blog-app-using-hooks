import React, { Component } from 'react';

export default class Setting extends Component {
  render() {
    return (
      <section className="pt-4">
        <h2 className="text-center text-4xl">Your Setting</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            // name="email"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 h-10"
            placeholder="URL of profile picture"
            // value={email}
          />
          <input
            onChange={this.handleChange}
            // name="password"
            type="text"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4"
            value="destinedeepak"
          />
          <textarea
            name=""
            className="block w-132 border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4  text-gray-400"
            rows="8"
          >
            Short bio about you
          </textarea>
          <input
            onChange={this.handleChange}
            type="email"
            // name="email"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4"
            placeholder="Email"
            value="zeroku@gmail.com"
          />
          <input
            onChange={this.handleChange}
            // name="text"
            type="password"
            className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4"
            placeholder="New Password"
            // value="zeroku@gmail.com"
          />
          <div className="w-132 mx-auto text-right pt-8">
            <button
              className="bg-primary px-6 py-3 rounded text-white inline-block submit"
              type="submit"
              // disabled={errors.email || errors.password}
            >
              Update Setting
            </button>
          </div>
          <div className="border-t border-gray-300 w-132 mx-auto mt-8"></div>
          <div className="w-132 mx-auto text-left pt-8">
            <button className="border border-red-500 px-6 rounded text-red-500 inline-block submit h-10 hover:bg-red-500 hover:text-white">
              Or click here to logout.
            </button>
          </div>
        </form>
      </section>
    );
  }
}
