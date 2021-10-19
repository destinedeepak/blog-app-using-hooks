import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import NoMatch from './NoMatch';
import NewPost from './NewPost';
import { Switch } from 'react-router-dom';
import SinglePost from './SinglePost';
import Setting from './Setting';
import { LocalStorageKey, CURRENT_USER_URL } from '../utils/constant';
import Loader from './Loader';
import Profile from './Profile';
import EditArticle from './EditArticle';
import ErrorBoundary from './ErrorBoundary';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';

function App() {
  let intialUserState = {
    user: null,
    isUserLogged: false,
    userVerifying: true,
  };
  const [userDetails, setUserDetails] = useState(intialUserState);
  useEffect(() => {
    let token = localStorage[LocalStorageKey];
    if (token) {
      fetch(CURRENT_USER_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errors) => Promise.reject(errors));
          }
          return res.json();
        })
        .then((user) => {
          updateUser(user.user);
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      setUserDetails({ ...userDetails, userVerifying: false });
    }
  }, []);

  const updateUser = (user) => {
    setUserDetails({
      ...userDetails,
      user: user,
      isUserLogged: true,
      userVerifying: false,
    });
    localStorage.setItem(LocalStorageKey, user.token);
  };

  let { userVerifying, isUserLogged, user } = userDetails;
  if (userVerifying) {
    return <Loader />;
  }
  return (
    <div>
      <UserContext.Provider
        value={{ isUserLogged, user, updateUser: updateUser }}
      >
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <ErrorBoundary>
          {isUserLogged ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        </ErrorBoundary>
      </UserContext.Provider>
    </div>
  );
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost />
      </Route>
      <Route path="/new-post">
        <NewPost />
      </Route>
      <Route path="/edit-article/:slug">
        <EditArticle />
      </Route>
      <Route path="/setting">
        <Setting />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
function UnAuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
