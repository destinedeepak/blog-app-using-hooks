import React, { Component } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import Loader from './Loader';
import moment from 'moment';
export default class Comments extends Component {
  state = {
    comments: null,
    errors: null,
  };
  componentDidMount() {
    fetch(ARTICLES_URL + `/${this.props.slug}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.props.user.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errors) => Promise.reject());
        }
        return res.json();
      })
      .then((data) => this.setState({ comments: data.comments }))
      .catch((errors) =>
        this.setState({ errors: 'Unable to fetch comments!' })
      );
  }
  render() {
    if (this.state.errors)
      return (
        <p className="text-red-500 text-center mt-4">{this.state.errors}</p>
      );
    if (!this.state.comments) return <Loader />;
    return (
      <ul className="mt-4">
        {this.state.comments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })}
      </ul>
    );
  }
}

function Comment(props) {
  let { author, body, createdAt } = props.comment;
  return (
    <li className="bg-tertiary border rounded border-gray-200 mb-4">
      <p className="bg-white p-4">{body}</p>
      <div className="flex px-4 py-3 items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-4 rounded-full h-4 object-cover"
            src={author.image}
            alt={author.username}
          />
          <span className="text-primary text-sm font-light mx-1">
            {author.username}
          </span>
          <span className="text-gray-400 font-light text-xs">
            {moment(createdAt).format('ddd MMM D YYYY')}
          </span>
        </div>
        <button className="bg-danger text-white text-sm px-2 rounded">
          Delete
        </button>
      </div>
    </li>
  );
}
