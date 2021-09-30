import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import NoMatch from './NoMatch';
import { Switch } from 'react-router-dom';
import SinglePost from './SinglePost';
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/articles/:slug" component={SinglePost}/>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
