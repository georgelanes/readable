import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Posts from './posts';
import Categories from './categories';
import Comments from './comments';
import PostsSort from './postsSort';


const rootReducer = combineReducers({
    posts: Posts,
    categories: Categories,
    comments: Comments,
    postsOrder: PostsSort,
    form: formReducer
});

export default rootReducer;
