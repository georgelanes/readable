import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { editPost, fetchPost } from '../../actions';


class PostsEdit extends Component {
   
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
        this.handleInitialize();
        
    }
    
    handleInitialize() {
        if (this.props.post) {
          const initData = {
            "title": this.props.post.title,
            "body": this.props.post.body
          };
          this.props.initialize(initData);
        }
    }
    
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
        return (            
            <FormGroup validationState={className}>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }
    
    renderTextAreaField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
        return (
            <FormGroup validationState={className}>
                <label className="control-label">{field.label}</label>
                <FormControl
                    componentClass="textarea"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }

    onSubmit(values) {
        const { editPost, match: { params: { id, category } }, history } = this.props;
        console.log(this.props)
        
        editPost(id, values, () => {
            history.push(`/${category}/${id}`);
        });
    }
    
    render() {
        const {
            handleSubmit,
            post,
            match: { params: { category } },
        } = this.props;
        
        return (
            <div>
                <h1>Edit Post</h1>
                <hr />
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <FormGroup>
                        <ControlLabel>Author</ControlLabel>
                        <FormControl.Static>{post ? post.author : ''}</FormControl.Static>
                    </FormGroup>
                    <Field  label="Title:"  name="title" component={this.renderField} />
                    <Field  label="Content:"  name="body" component={this.renderTextAreaField} />

                    <Link to={'/'} className="btn btn-default">Cancel</Link>
                    {' '}
                    <Button type="submit" bsStyle="primary">Update</Button>
                    
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Enter the post title"
    }
    
    if (!values.body) {
        errors.body = "Enter the post content."
    }
    
    if (!values.category) {
        errors.category = "Select the category!"
    }
    
    return errors;
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}


export default reduxForm({
    validate,
    form: 'EditPostForm'
})(
    connect(mapStateToProps, { editPost, fetchPost })(PostsEdit)
);
