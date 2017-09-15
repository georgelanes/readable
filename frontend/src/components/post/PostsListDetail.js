import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Glyphicon,
    ButtonGroup,
    ButtonToolbar
} from 'react-bootstrap';
import {
    voteForPost,
    deletePost,
    fetchPostCommentsCount
} from '../../actions';
import { timestampToDate } from '../../utils/dateHelper';


class PostsListDetail extends Component {
    state = {
        commentCount: 0
    }

    componentDidMount() {
        this.props.fetchPostCommentsCount(this.props.post.id, (data) => {
            this.setState({ commentCount: data.count })
        });
    }

    deleteButtonPress(id) {
        this.props.deletePost(id, () => {});
    }
    
    render() {
        const { post, voteForPost } = this.props;
        
        return (
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
                                <Button title="Delete Post" bsStyle="danger"  onClick={() => this.deleteButtonPress(post.id)} >
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
                    <h4>
                        <Link  to={`${post.category}/${post.id}`} style={{ textDecoration: 'none' }}  >
                            {post.title}
                        </Link>                       
                    </h4>
                    <p>{post.body}</p>
                    <hr />
                </Row>
            </div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    const { commentCount } = state.comments;
    return { commentCount };
}

export default connect(mapStateToProps, {
    voteForPost, deletePost, fetchPostCommentsCount
})(PostsListDetail);

