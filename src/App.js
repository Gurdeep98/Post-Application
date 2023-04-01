import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import UsersList from './Components/UserList';
import UserDetailPage from './Components/UserDetailPage';
import NewPost from './Components/NewPost';
import NewComment from './Components/NewComment';



const App = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/users" activeClassName="active">Users</NavLink>
            </li>
          </ul>
        </nav>
        

        <Switch>
          <Route path="/users/:userId/posts/:postId/newComment">
            <NewComment/>
          </Route>
        <Route path="/users/:userId/newpost">
            <NewPost/>
          </Route>
          <Route path="/users/:userId">
            <UserDetailPage />
          </Route>
          
          <Route path="/users">
            <UsersList/>
          </Route>
          <Route path="/">
            <h1>Home Page</h1>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
