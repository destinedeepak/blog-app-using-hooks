import { useState, useEffect, useContext } from 'react';
import { PROFILE_URL } from '../utils/constant';
import ToggleFollowButton from './ToggleFollowButton';
import Loader from './Loader';
import UserContext from './UserContext';

export default function ProfileBanner(props) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  // static contextType = UserContext;
  let { user } = useContext(UserContext);
  // componentDidMount() {
  //   let {username} = this.props;//username from slug
  //   let {user} = this.context;//current user
  //   let token = user ? 'Token ' + user.token : '';
  //   fetch(PROFILE_URL + '/' + username, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         return Promise.reject('Unable to fetch profile!');
  //       }
  //       return res.json();
  //     })
  //     .then((profile) => this.setState({ profile: profile.profile }))
  //     .catch((error) => this.setState({ error }));
  // }
  useEffect(() => {
    console.log(props.match)
    let { username } = props; //username from slug
    let token = user ? 'Token ' + user.token : '';
    fetch(PROFILE_URL + '/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to fetch profile!');
        }
        return res.json();
      })
      // .then((profile) => this.setState({ profile: profile.profile }))
      .then((profile) => setProfile(profile.profile))

      // .catch((error) => this.setState({ error }));
      .catch((error) => setError(error));
  }, []);
  if (error)
    return <p className="text-red-500 mt-8 text-lg text-center">{error}</p>;
  if (!profile) return <Loader />;
  let { username, image } = profile;
  return (
    <div className="bg-gray-200 py-4 text-center">
      <img
        className="w-24 h-24 rounded-full inline-block mt-4 object-cover"
        src={image}
        alt=""
      />
      <h3 className="font-bold text-xl text-gray-700 mt-4">{username}</h3>
      <div className="text-right pr-60">
        <ToggleFollowButton profile={profile} />
      </div>
    </div>
  );
}
