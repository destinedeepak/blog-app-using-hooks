import Posts from './Posts';
// import Banner from './Banner';
import Tags from './Tags';
import { ARTICLES_URL } from '../utils/constant';
import Pagination from './Pagination';
import FeedNav from './FeedNav';
import UserContext from './UserContext';
import { useState, useEffect, useContext } from 'react';

export default function Home() {
  const articleDetailsInitialState = {
    articles: null,
    error: null,
    articlesCount: 0,
    articlePerPage: 10,
    activePageIndex: 0,
    activeNav: 'global',
    activeTag: '',
  };
  const [articleDetails, setArticleDetails] = useState(
    articleDetailsInitialState
  );
  let { articlesCount, articlePerPage, activePageIndex, activeTag, activeNav } =
    articleDetails;

  let { user } = useContext(UserContext);

  useEffect(() => {
    const limit = articlePerPage;
    const offset = activePageIndex * 10;
    const tag = activeTag;
    let feed = activeNav === 'your' ? '/feed' : '';
    let token = user ? 'Token ' + user.token : '';
    fetch(
      ARTICLES_URL +
        `${feed}/?limit=${limit}
          &offset=${offset}` +
        (tag && `&tag=${tag}`),
      {
        method: 'GET',
        headers: {
          'Conten-Type': 'application/json',
          Authorization: token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        else return res.json();
      })
      .then((data) =>
        setArticleDetails((articleDetails) => {
          return {
            ...articleDetails,
            articles: data.articles,
            articlesCount: data.articlesCount,
          };
        })
      )
      .catch((error) =>
        setArticleDetails((articleDetails) => {
          return {
            ...articleDetails,
            error: 'Not able to fetch articles!',
          };
        })
      );
  }, [activePageIndex, activeTag, activeNav]);

  const handleNavigation = (tab) => {
    setArticleDetails((articleDetails) => {
      return {
        ...articleDetails,
        activeTag: '',
        activeNav: tab,
        activePageIndex: 0,
      };
    });
  };
  const addTagTab = (tag) => {
    setArticleDetails((articleDetails) => {
      return {
        ...articleDetails,
        activeTag: tag,
        activeNav: '',
        activePageIndex: 0,
      };
    });
  };

  const handlePagination = (pageIndex) => {
    setArticleDetails((articleDetails) => {
      return { ...articleDetails, activePageIndex: pageIndex };
    });
  };

  return (
    <main>
      {/* <Banner /> */}
      <div className="px-40">
        <div className="flex">
          <div className="w-8/12">
            <FeedNav
              activeTag={activeTag}
              activeNav={activeNav}
              handleNavigation={handleNavigation}
            />
            <Posts {...articleDetails} />
          </div>
          <div className="w-3/12 ml-12 mt-4">
            <Tags addTagTab={addTagTab} activeTag={activeTag} />
          </div>
        </div>
        {articlesCount <= 10 ? (
          ''
        ) : (
          <Pagination
            articlesCount={articlesCount}
            articlePerPage={articlePerPage}
            handlePagination={handlePagination}
            activePageIndex={activePageIndex}
          />
        )}
      </div>
    </main>
  );
}
