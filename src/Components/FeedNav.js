import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class FeedNav extends Component {
  render() {
    let { activeNav, removeTagTab } = this.props;
    return (
      <nav className="mt-8 pl-4">
        <ul className="border-b flex">
          <li
            className={`text-gray-400 px-6 pb-2 ${
              !activeNav ? 'border-b-2 border-green-500' : ''
            }`}
            onClick={removeTagTab}
          >
            <NavLink to="">Global Feed</NavLink>
          </li>
          {activeNav && (
            <li
              className={`text-gray-400 px-6 pb-2 ${
                activeNav ? 'border-b-2 border-green-500' : ''
              }`}
            >
              <NavLink to=""> {activeNav}</NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
