import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class FeedNav extends Component {
  render() {
    let { activeTag, handleNavigation, activeNav } = this.props;
    return (
      <nav className="mt-8 pl-4">
        <ul className="border-b flex">
          <li
            className={`text-gray-400 px-6 pb-2 ${
              !activeTag && activeNav === 'your'
                ? 'border-b-2 border-green-500'
                : ''
            }`}
            onClick={()=>{handleNavigation('your')}}
          >
            <NavLink to="">Your Feed</NavLink>
          </li>
          <li
            className={`text-gray-400 px-6 pb-2 ${
              !activeTag && activeNav === 'global'
                ? 'border-b-2 border-green-500'
                : ''
            }`}
            onClick={()=>{handleNavigation('global')}}
          >
            <NavLink to="">Global Feed</NavLink>
          </li>
          {activeTag && (
            <li
              className={`text-gray-400 px-6 pb-2 ${
                activeTag ? 'border-b-2 border-green-500' : ''
              }`}
            >
              <NavLink to=""> {activeTag}</NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
