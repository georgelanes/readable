import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import MainPage from './home/MainPage';
import PostsDetail from './post/PostsDetail';
import PostsNew from './post/PostsNew';
import PostsEdit from './post/PostsEdit';
import CommentsNew from './comment/CommentsNew';
import CommentsEdit from './comment/CommentsEdit';
import NavbarHeader from './header/NavbarHeader';
import PageNotFound from './PageNotFound';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavbarHeader />
          <Grid>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/posts/new" exact component={PostsNew} />
              <Route path="/:category" exact component={props => <MainPage {...props} />} />
              <Route path="/:category/edit/:id" children={props => <PostsEdit {...props}/>} />
              <Route path="/:category/:id" exact component={PostsDetail} />
              <Route path="/:category/:id/comments/new" component={CommentsNew} />
              <Route path="/:category/:postId/comments/edit/:id" component={props => <CommentsEdit {...props}/>} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
