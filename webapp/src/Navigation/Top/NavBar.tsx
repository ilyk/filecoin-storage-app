/*
 * Copyright 2020 Ievgen Pervushyn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {Nav, Navbar, Image, Row} from "react-bootstrap";
import {withRouter} from "react-router";
import user_icon from'../../_resources/icons/user.svg'

export const NavBar = withRouter(({location}) => <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#home">Storage App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav defaultActiveKey="/home" className="mr-auto" activeKey={location.pathname}>
            <Nav.Link href="/">Files</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
            <Nav.Link href="/get">Get File</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    <Navbar.Text>
        <Row className="small text-white text-right"><strong>Balance:</strong> 10232.123124124542 FIL</Row>
        <Row className="small text-white text-right"><strong>Main Address:</strong>
            <span style={{textOverflow:"ellipsis"}}>t1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei</span></Row>
    </Navbar.Text>
    <Image src={user_icon} roundedCircle width={45} />
</Navbar>)
