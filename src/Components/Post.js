import React from 'react';
import { Link } from 'react-router-dom';
export default function Post(props) {
  let { author, createdAt, favoritesCount, title, body, tagList, slug } = props;
  return (
    <section className="mt-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="w-8 rounded-full h-8 object-cover"
            src={author.image}
            alt={author.name}
          />
          <div className="ml-1">
            <h4 className="text-primary">{author.username}</h4>
            <time dateTime="" className="text-xs text-gray-400">
              {createdAt}
            </time>
          </div>
        </div>
        <div>
          <div className="border border-primary rounded text-primary py-1 px-2 text-sm">
            <i className="fas fa-heart"></i> <span>{favoritesCount}</span>
          </div>
        </div>
      </div>
      <Link to={`/articles/${slug}`}>
        <h2 className="font-semibold text-2xl">{title}</h2>
      </Link>
      <Link to={`/articles/${slug}`}>
        <p className="text-gray-400 font-light">
          {!body ? '' : body.slice(0, 300)}...
        </p>
      </Link>
      <div className="flex justify-between items-center">
      <Link to={`/articles/${slug}`}>
      <button className="text-gray-500 mt-4">Read More...</button>
      </Link>
        <ul>
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
