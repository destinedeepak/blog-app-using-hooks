import Loader from './Loader';
import Post from './Post';
export default function Posts(props) {
  let { articles, error } = props;
  if (error)
    return <p className="text-3xl text-center mt-4 text-red-500">{error}</p>;
  if (!articles) return <Loader />;
  return articles.map((article) => <Post {...article} key={article.slug} />);
}
