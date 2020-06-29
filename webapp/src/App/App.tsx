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
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "../Navigation";
import {Navbar, Row} from "react-bootstrap";
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from 'history';
import {FilesPage, GetPage, UploadPage} from '../Page';

const history = createBrowserHistory();

export const App = () => {
    return (
        <Router history={history}>
            <NavBar/>
            <Switch>
                <Route path="/" render={props => <FilesPage key={Date.now()} {...props} />}/>
                <Route path="/upload" render={props => <UploadPage key={Date.now()} {...props} />}/>
                <Route path="/get" render={props => <GetPage key={Date.now()} {...props} />}/>
            </Switch>
            <footer>
                <Navbar bg="light" fixed="bottom">
                    <Navbar.Text className="text-right small pull-right">
                        <Row>Copyright 2020 <a href="https://github.com/ilyk" target="_blank" rel="noopener noreferrer">Ievgen
                            Pervushyn</a></Row>
                        <Row>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a
                            href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Row>
                    </Navbar.Text>
                </Navbar>
            </footer>
        </Router>
    );
}
