import React from 'react';
import { Link } from 'react-router-dom';
import {
    Row
} from 'react-bootstrap';


const NavbarHeader = () => {
    return (
        <Row>
            <h1 className="app-title"> <Link to="/">Readable</Link></h1>
            <hr />
        </Row>
    );
};

export default NavbarHeader;

