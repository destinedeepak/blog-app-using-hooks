import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import Posts from './Posts';
import ProfileBanner from './ProfileBanner';
import ProfileFeedNav from './ProfileFeedNav';
export default class Profile extends Component {
  state = {
    activeTab: 'author',
    error: null,
    articles: null,
  };
  componentDidMount() {
    this.fetchData({});
  }
  handleActiveTab = (label) => {
    this.setState({ activeTab: label }, () => {
      this.fetchData({});
    });
  };
  fetchData() {
    let { token, username } = this.props.user;
    console.log(token, username);
    // ?author=jake
    fetch(`${ARTICLES_URL}?${this.state.activeTab}=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to fetch data!');
        }
        return res.json();
      })
      .then((data) => this.setState({ articles: data.articles }))
      .catch((error) => this.setState({ error }));
  }
  render() {
    let { articles, error, activeTab } = this.state;
    console.log(articles, error);
    return (
      <section>
        <ProfileBanner user={this.props.user} />
        <ProfileFeedNav
          activeTab={activeTab}
          handleActiveTab={this.handleActiveTab}
        />
        <div className="px-60">
          <Posts articles={articles} error={error} />
        </div>
      </section>
    );
  }
}
