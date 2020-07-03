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

import {Navbar, Row} from "react-bootstrap";
import React from "react";

export const Footer = () => <footer>
    <Navbar bg="light" fixed="bottom">
        <Navbar.Text className="text-right small pull-right">
            <Row>Copyright 2020 <a href="https://github.com/ilyk" target="_blank" rel="noopener noreferrer">
                Ievgen Pervushyn</a></Row>
            <Row>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Row>
        </Navbar.Text>
    </Navbar>
</footer>
