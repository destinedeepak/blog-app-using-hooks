import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_URL } from '../utils/constant';
import UserContext from './UserContext';
export default function ToggleFollowButton(props) {
  const [following, setFollowing] = useState(null);
  const [error, setError] = useState(null);
  let { user } = useContext(UserContext);
  useEffect(() => {
    setFollowing(props.profile.following);
  }, []);
  const handleFollow = (username) => {
    let method = following ? 'DELETE' : 'POST';
    fetch(PROFILE_URL + `/${username}/follow`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + user.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((profile) => {
        setFollowing(profile.profile.following);
      })
      .catch((error) => {
        setError('Unable to fetch data!');
      });
  };
  let currentUsername = user && user.username;
  let { username } = props.profile;
  if (error)
    return <p className="text-right text-center mt-4 text-red-500">{error}</p>;
  if (!currentUsername) {
    return '';
  } else if (currentUsername === username) {
    return (
      <button className="text-gray-400 border border-gray-500 rounded py-1 px-2 text-sm hover:bg-gray-500">
        <Link to="/setting">
          {' '}
          <i className="fas fa-cog"></i> Edit Profile Setting
        </Link>
      </button>
    );
  }
  return (
    <button
      className="text-gray-400 border border-gray-500 rounded py-1 px-2 text-sm hover:bg-gray-500"
      onClick={() => {
        handleFollow(username);
      }}
    >
      <i className="fas fa-user-plus"></i>
      <span className="ml-1">
        {' '}
        {following ? 'unfollow' : 'follow'} {username}
      </span>
    </button>
  );
}
