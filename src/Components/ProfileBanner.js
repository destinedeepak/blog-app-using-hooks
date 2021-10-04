import React from 'react';
import { Link } from 'react-router-dom';
export default function ProfileBanner(props) {
    let {username} =  props.user;
    console.log(props.user);
  return (
    <div className="bg-gray-200 py-4 text-center">
      <img
        className="w-24 h-24 rounded-full inline-block mt-4"
        src="data:image/png;base64,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"
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
