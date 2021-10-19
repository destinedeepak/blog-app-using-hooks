import React, { useState, useContext } from 'react';
import { ARTICLES_URL } from '../utils/constant';
import validate from '../utils/validate';
import { withRouter } from 'react-router-dom';
import UserContext from './UserContext';

function NewPost(props) {
  const initialNewArticleState = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  };
  const [newArticle, setNewArticle] = useState(initialNewArticleState);
  const [error, setError] = useState(null);
  let { errors, title, description, body, tagList } = newArticle;
  let { user } = useContext(UserContext);
  const handleChange = (event) => {
    let { name, value } = event.target;
    validate(errors, name, value);
    setNewArticle({ ...newArticle, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  const fetchData = () => {
    tagList = tagList.split(',').map((ele) => ele.trim());
    let data = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    fetch(ARTICLES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + user.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((body) => {
        setNewArticle({
          ...newArticle,
          title: '',
          description: '',
          body: '',
          tagList: '',
        });
        props.history.push('/');
      })
      .catch((errors) => {
        setError('Unable to fetch!');
      });
  };
  if (error)
    return <p className="text-3xl text-center mt-4 text-red-500">{error}</p>;
  return (
    <section className="text-center pt-14 px-64">
      <form onSubmit={handleSubmit} className="border p-8 rounded shadow">
        <h2 className="text-left text-xl">Write your Article...</h2>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
          placeholder="Article Title"
          value={title}
        />
        <span className="text-red-500 block">{errors.title}</span>
        <input
          onChange={handleChange}
          type="text"
          name="description"
          className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4 h-10 h-10"
          placeholder="description"
          value={description}
        />
        <span className="text-red-500 block">{errors.description}</span>
        <textarea
          onChange={handleChange}
          name="body"
          className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4  text-gray-400"
          rows="6"
          placeholder="Write your article (in markdown)"
          value={body}
        ></textarea>
        <span className="text-red-500 block">{errors.article}</span>
        <input
          onChange={handleChange}
          name="tagList"
          type="text"
          className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 h-10"
          placeholder="Enter tags sperated by a comma"
          value={tagList}
        />
        <span className="text-red-500 block">{errors.tagList}</span>
        <div className="text-right pt-8">
          <button
            className="bg-primary px-6 rounded text-white h-10 inline-block submit hover:bg-green-700 submit"
            type="submit"
            disabled={
              errors.title ||
              errors.description ||
              errors.body ||
              errors.tagList ||
              !title ||
              !description ||
              !body ||
              !tagList
            }
          >
            Publish Article
          </button>
        </div>
      </form>
    </section>
  );
}

export default withRouter(NewPost);
