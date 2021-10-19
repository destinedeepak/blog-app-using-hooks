import { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { ARTICLES_URL } from '../utils/constant';
import Posts from './Posts';
import ProfileBanner from './ProfileBanner';
import ProfileFeedNav from './ProfileFeedNav';
function Profile(props) {
  const [activeTab, setActiveTab] = useState('author');
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  let { username } = props.match.params;
  useEffect(() => {
    fetch(`${ARTICLES_URL}?${activeTab}=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to fetch data!');
        }
        return res.json();
      })
      .then((data) => setArticles(data.articles))
      .catch((error) => setError(error));
  }, [activeTab]);
  const handleActiveTab = (label) => {
    setActiveTab(label);
  };

  return (
    <section>
      <ProfileBanner username={username} />
      <ProfileFeedNav activeTab={activeTab} handleActiveTab={handleActiveTab} />
      <div className="px-60">
        <Posts articles={articles} error={error} />
      </div>
    </section>
  );
}

export default withRouter(Profile);
