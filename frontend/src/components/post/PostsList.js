import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row, Button, Panel, DropdownButton, MenuItem, Alert
} from 'react-bootstrap';
import {
    fetchPosts,
    voteForPost,
    deletePost,
    fetchPostComments,
    fetchCategoryPosts,
    postSortOrder
} from '../../actions';
import PostsListDetail from './PostsListDetail';


class PostsList extends Component {
    componentDidMount() {
        if(this.props.match.params.category) {
            const {
                fetchCategoryPosts,
                match: { params: { category } } } = this.props;
            fetchCategoryPosts(category.toLowerCase());
        } else {
            this.props.fetchPosts();
        }
    }
    
    deleteButtonPress(id) {
        this.props.deletePost(id, () => {});
    }
    
    renderPosts() {
        const { posts } = this.props;
        
        if (posts.length === 0) {
            return <Alert>No posts found for the selected category!</Alert>
        }
            
        if (posts) {
            const orderedPosts = _.sortBy(posts, this.props.postsOrder).reverse()
            
            return _.map(orderedPosts, post => <PostsListDetail key={post.id} post={post} />);
        }
        
        return <div>Loading...</div>
    }
    
    render() {
        const { postSortOrder } = this.props;
        return (
            <div>
                <Row>
                    <Panel>
                        <Link to="posts/new">
                            <Button bsStyle="primary">New Post</Button>
                        </Link>
                        {' '}
                        <DropdownButton title="Sort By" id="sortBy">
                            <MenuItem key="voteScore" onClick={event => postSortOrder("voteScore")}>Votes</MenuItem>
                            <MenuItem key="timestamp" onClick={event => postSortOrder("timestamp")}>Date</MenuItem>
                        </DropdownButton>
                    </Panel>                            
                </Row>
                {this.renderPosts()}
            </div>
        );
    }
}

function mapStateToProps (state) {
    const posts = _.filter(state.posts, post => !post.deleted);
    const { postsOrder } = state;
    return { posts, postsOrder }
}

export default connect(mapStateToProps, {
    fetchPosts,
    voteForPost,
    deletePost,
    fetchPostComments,
    fetchCategoryPosts,
    postSortOrder
})(PostsList);

