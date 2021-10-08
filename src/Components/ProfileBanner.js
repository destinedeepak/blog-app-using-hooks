import React from 'react';
import { Link } from 'react-router-dom';
export default function ProfileBanner(props) {
    let {username, image} =  props.user;
  return (
    <div className="bg-gray-200 py-4 text-center">
      <img
        className="w-24 h-24 rounded-full inline-block mt-4 object-cover"
        src = {image}
        alt=""
      />
      <h3 className="font-bold text-xl text-gray-700 mt-4">{username}</h3>
      <div className="text-right pr-60">
        <button className="text-gray-400 border border-gray-500 rounded py-1 px-2 text-sm hover:bg-gray-500">
          <Link to="/setting">
            {' '}
            <i className="fas fa-cog"></i> Edit Profile Setting
          </Link>
        </button>
      </div>
    </div>
  );
}
