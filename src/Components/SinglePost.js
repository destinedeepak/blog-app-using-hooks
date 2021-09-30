import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import Loader from './Loader';
export default class SinglePost extends Component {
  state = { article: null, error: null };
  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(ARTICLES_URL + '/' + slug)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        else return res.json();
      })
      .then((data) => {
          console.log(data);
        this.setState({ article: data.article });
      })
      .catch((error) => {
        this.setState({ error: 'Unable to fetch article!' });
      });
  }
  render() { 
    if (this.state.error)
      return <p className="text-red-500 mt-8 text-lg text-center">{this.state.error}</p>;
    if (!this.state.article) return <Loader />;
    console.log(this.state.article);
    let {author, createdAt, favoritesCount, title, body, tagList,description} = this.state.article;
    return (
      <section>
        <div className="bg-secondary py-8 pl-40">
          <h1 className="text-white text-5xl mb-8">{title}</h1>
          <div className="flex items-center">
            <img
              className="w-8 rounded-full h-8"
              src={author.image}
              alt={author.username}
            />
            <div className="ml-1">
              <h4 className="text-primary negmb">{title}</h4>
              <time dateTime="" className="text-xs text-gray-400 inline-block">
               {createdAt}
              </time>
            </div>
          </div>
        </div>
        <p className="px-40 py-10 text-xl">
          {description}
        </p>
        <div>
        <ul className="pl-40">
          {tagList.map((tag) => (
            <li
              key={tag}
              className="text-gray-400 font-light border rounded-lg inline-block px-2 text-xs ml-1"
            >
              {tag}
            </li>
          ))}
        </ul>
        </div>
      </section>
    );
  }
}
