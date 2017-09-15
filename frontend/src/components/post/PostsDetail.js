import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Button,
    Row,
    Col,
    Glyphicon,
    ButtonToolbar,
    ButtonGroup
} from 'react-bootstrap';
import CommentsList from '../comment/CommentsList';
import PageNotFound from '../PageNotFound';
import {
    fetchPost,
    deletePost,
    voteForPost,
    fetchPostCommentsCount
} from '../../actions';
import { timestampToDate } from '../../utils/dateHelper';


class PostsDetail extends Component {
    state = {
        commentCount: 0    
    }
    
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
        this.props.fetchPostCommentsCount(id, (data) => {
            this.setState({ commentCount: data.count })
        });
    }
    
    componentDidReceiveProps(nextProps) {
        console.log(nextProps)
    }

    deleteButtonPress() {
        this.props.deletePost(this.props.match.params.id, () => {
            this.props.history.push('/')
        });
    }
    
    render() {
        const {
            post,
            voteForPost,
            match: {
                params: {
                    category
                }
            }
        } = this.props;

        return (
            (!post || post.category !== category)
            ? <PageNotFound />
            :
                <div>
                    <Row>                        
                        <Col md={4}>
                            <div className="post-numbers">
                                <div className="votes">
                                    <div className="mini-counts">
                                        <span>{post.category}</span>
                                    </div>
                                    <div>category</div>
                                </div>                        
                                <div className="votes">
                                    <div className="mini-counts">
                                        {post.voteScore}
                                    </div>
                                    <div>votes</div>
                                </div>
                                <div className="votes">
                                    <div className="mini-counts">
                                        <span>{this.state.commentCount ? this.state.commentCount : 0 } </span>
                                    </div>
                                    <div>comments</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <h4 className="text-center">{post.author}</h4>
                            <h5 className="text-center">{timestampToDate(post.timestamp)}</h5>
                        </Col>                        
                        <Col md={4}>                  
                            <ButtonToolbar className="pull-right">
                                <ButtonGroup>
                                    <Button title="vote up" onClick={() => voteForPost(post.id, 'upVote')}>
                                        <Glyphicon glyph="chevron-up" />
                                    </Button>                             
                                    <Button  title="vote down" onClick={() => voteForPost(post.id, 'downVote')}>
                                        <Glyphicon glyph="chevron-down" />
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button title="Delete Post" bsStyle="danger"  onClick={this.deleteButtonPress.bind(this)} >
                                        <Glyphicon glyph="trash" />
                                    </Button>
                                    <Link to={`/${post.category}/edit/${post.id}`} title="Edit Post" className="btn btn-info">
                                        <Glyphicon glyph="pencil" />
                                    </Link>
                                </ButtonGroup>                    
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <hr />
                    </Row>
                    <Row>
                        <div className="text-left">
                            <Link className="btn btn-primary" to={`/${post.category}/${post.id}/comments/new`}>Add comment</Link>  
                        </div>
                    </Row>
                    <p></p>
                    <CommentsList postCategory={post.category} postId={post.id} />
                </div>    
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {
    fetchPost, deletePost, voteForPost, fetchPostCommentsCount
})(PostsDetail);


