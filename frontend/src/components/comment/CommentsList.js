import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Glyphicon
} from 'react-bootstrap';
import NotFound from '../PageNotFound';
import {
    fetchPostComments,
    voteForComment,
    deleteCommentPost,
    fetchPostCommentsCount
} from '../../actions';
import { timestampToDate } from '../../utils/dateHelper';


class CommentsList extends Component {
    
    componentWillMount() {
        const { fetchPostComments, postId } = this.props;
        fetchPostComments(postId);
    }
    
    deleteButtonPress(id) {
        const {
            deleteCommentPost,
            fetchPostComments,
            postId
        } = this.props;
        
        deleteCommentPost(id, () => {
            fetchPostComments(postId);
        });
    }
    
    renderCommentsList() {
        const { comments, voteForComment, postCategory } = this.props
        if (comments) {
            return _.map(comments, (comment, id) => {
                return (
                        <div key={id}>
                            <Row>
                                <div>{timestampToDate(comment.timestamp)}</div> 
                                <div>commented by {comment.author} on {comment.body}</div>
                                
                                <ButtonToolbar className="pull-right">
                                    <ButtonGroup>
                                        <Button onClick={() => voteForComment(comment.id, 'upVote')}>
                                            <Glyphicon glyph="chevron-up" />
                                        </Button>
                                        <div className="btn btn-default">{comment.voteScore}</div>
                                        <Button onClick={() => voteForComment(comment.id, 'downVote')}>
                                            <Glyphicon glyph="chevron-down" />
                                        </Button>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Link title="Edit" className="btn btn-info" to={`/${postCategory}/${comment.parentId}/comments/edit/${comment.id}`}>
                                            <Glyphicon glyph="pencil" />
                                        </Link>
                                        <Button className="btn btn-danger" onClick={() => this.deleteButtonPress(comment.id)} >
                                        <Glyphicon glyph="trash" />
                                        </Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                                <hr />
                            </Row>
                        </div>
                );
            });
        }
        return <NotFound />
    }
    
    render() {
        return (
            <div>
                {this.renderCommentsList()}
            </div>
        );
    }
}

function mapStateToProps (state) {
    const comments = _.filter(state.comments, comment => !comment.deleted);
    return { comments }
}

export default connect(mapStateToProps, {
    fetchPostComments, voteForComment, deleteCommentPost, fetchPostCommentsCount
})(CommentsList);
