import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PostsList from '../post/PostsList';
import CategoriesList from '../category/CategoriesList';


class MainPage extends Component {
    render() {
        return (
            <Row>
                <Col md={2}>
                    <h3>Categories</h3>
                    <CategoriesList />
                </Col>
                <Col md={10}>
                    <h3>Posts</h3>
                    <PostsList {...this.props} />
                </Col>
            </Row>
        );
    }
}

export default MainPage;
