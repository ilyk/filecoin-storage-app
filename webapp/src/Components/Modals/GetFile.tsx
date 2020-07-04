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

import React, {useState} from "react";
import {Button, Form, FormControl, Image, InputGroup, Modal} from "react-bootstrap";
import finger_print from '../../_resources/icons/finger-prints.svg'
import {RetrieveFileButton} from "./RetrieveFileModal";

interface IProps {
    toggle: Function;
    show: boolean;
}

export const GetFileModal = ({toggle, show}: IProps) => {
    const [cid, setCid] = useState('')
    return <Modal show={show} onHide={() => toggle(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Retrieve file...</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>CID</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="cid-addon">
                                <Image src={finger_print} width={24}/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={(e) => setCid(e.currentTarget.value)}
                            placeholder="CID"
                            aria-label="CID"
                            aria-describedby="cid-addon"
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        Please enter CID of the file to retrieve
                    </Form.Text>
                </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="dark" onClick={() => toggle(false)}>Close</Button>
            <RetrieveFileButton cid={cid} toggle={() => toggle(true)}/>
        </Modal.Footer>
    </Modal>
}
