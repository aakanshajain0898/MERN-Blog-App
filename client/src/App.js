import React, { useEffect, useContext, lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
} from 'react-router-dom';
import Home from './screens/Home/Home';
import Auth from './screens/Auth/Auth';
import NavBar from './components/Navbar/Navbar';
import ThemeState from './context/themeContext';
import UserState, { UserContext } from './context/userContext/userContext';
import { USER } from './context/types';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const Profile = lazy(() => import('./screens/Profile/Profile'));
const SignOut = lazy(() => import('./screens/SignOut/SignOut'));
const CreatePost = lazy(() => import('./screens/CreatePost/CreatePost'));
const Reset = lazy(() => import('./screens/Reset/Reset'));
const NewPassword = lazy(() => import('./screens/NewPassword/NewPassword'));
const EditProfile = lazy(() => import('./screens/EditProfile/EditProfile'));

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(typeof user, user);
    if (user) {
      dispatch({ type: USER, payload: user });
      // history.replace('/');
    } else {
      if (!history.location.pathname.startsWith('/reset')) {
        history.replace('/auth');
      }
    }
  }, [dispatch, history]);

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/auth' component={Auth} />
      <Route path='/signOut' component={SignOut} />
      <Route exact path='/create' component={CreatePost} />
      <Route path='/create/:postId' component={CreatePost} />
      <Route exact path='/profile' component={Profile} />
      <Route path='/profile/:userId' component={Profile} />
      <Route path='/editprofile' component={EditProfile} />
      <Route exact path='/reset' component={Reset} />
      <Route path='/reset/:token' component={NewPassword} />
      <Route path='/explore' render={() => <Home type='all' />} />
      <Redirect to='/' />
    </Switch>
  );
};

const App = () => (
  <ThemeState>
    <UserState>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<h2>Loading...!</h2>}>
          <Routing />
        </Suspense>
      </BrowserRouter>
    </UserState>
  </ThemeState>
);

export default App;
