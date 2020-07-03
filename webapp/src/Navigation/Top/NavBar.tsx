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

import React, {Dispatch, SetStateAction} from 'react';
import {Button, Image, Nav, Navbar, Row} from "react-bootstrap";
import user_icon from '../../_resources/icons/user.svg'

interface IProps {
    showUpload: boolean;
    showHideUpload: Dispatch<SetStateAction<boolean>>;
    showGet: boolean;
    showHideGet: Dispatch<SetStateAction<boolean>>;
}

export const NavBar = ({showUpload, showHideUpload, showGet, showHideGet}: IProps) => <React.Fragment>
    <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="#home">Storage App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Button variant="link" className={`nav-link ${!showUpload && !showGet ? 'active' : ''}`}>
                    Files
                </Button>
                <Button variant="link" className={`nav-link ${showUpload ? 'active' : ''}`} onClick={() => showHideUpload(true)}>
                    Upload
                </Button>
                <Button variant="link" className={`nav-link ${showGet ? 'active' : ''}`} onClick={() => showHideGet(true)}>
                    Get file
                </Button>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
            <Row className="small text-white text-right"><strong>Balance:</strong> 10232.123124124542 FIL</Row>
            <Row className="small text-white text-right"><strong>Main Address:</strong>
                <span style={{textOverflow: "ellipsis"}}>t1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei</span></Row>
        </Navbar.Text>
        <Image src={user_icon} roundedCircle width={45}/>
    </Navbar>
</React.Fragment>

