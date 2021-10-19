import { useEffect, useContext } from 'react';
import Loader from './Loader';
import Comment from './Comment';
import { ARTICLES_URL } from '../utils/constant';
import UserContext from './UserContext';
export default function Comments({
  slug,
  fetchComments,
  error,
  comments,
  setError,
}) {
  let { user } = useContext(UserContext);
  useEffect(() => {
    fetchComments();
  }, []);
  const handleDelete = (id) => {
    fetch(ARTICLES_URL + `/${slug}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + user.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unable to fetch!');
        }
        fetchComments();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!comments) return <Loader />;
  return (
    <ul className="mt-4 mb-20">
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            handleDelete={handleDelete}
          />
        );
      })}
    </ul>
  );
}
