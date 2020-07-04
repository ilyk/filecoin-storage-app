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

import {Button, Form, FormControl, Image, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {IFile} from "../../_models/File";
import store_to_cloud from "../../_resources/icons/up-arrow-and-cloud.svg";
import {service} from "../../_service/backend";
import {useToasts} from "react-toast-notifications";
import duration_icon from "../../_resources/icons/time-left.svg";
import redundancy_icon from "../../_resources/icons/copy.svg";

interface IProps {
    file: IFile | null;
    toggle: Function;
    show: boolean;
}

const start = (cid: string, duration: number, redundancy: number, onOk: Function, onError: Function) => {
    let err = service.initiateStoring(cid, duration, redundancy)
    if (err != null) {
        onError(err)
    } else {
        onOk()
    }
}

export const StoreFileModal = ({file, toggle, show}: IProps) => {
    const [duration, setDuration] = useState(1);
    const [redundancy, setRedundancy] = useState(3);

    return null == file ? <span/> : <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
            <Modal.Title>Store File</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <p>Storing file: CID={file.cid}; size={file.size}</p>
                <Form.Group controlId="formBasicDuration">
                    <Form.Label>Duration</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="duration-addon">
                                <Image src={duration_icon} width={24}/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number" min="1" step="1"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.currentTarget.value))}
                            placeholder="Duration"
                            aria-label="Duration"
                            aria-describedby="duration-addon"
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        Please enter duration in blocks.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicRedundancy">
                    <Form.Label>Redundancy</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="redundancy-addon">
                                <Image src={redundancy_icon} width={24}/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number" min="1" step="1"
                            value={redundancy}
                            onChange={(e) => setRedundancy(parseInt(e.currentTarget.value))}
                            placeholder="Redundancy"
                            aria-label="Redundancy"
                            aria-describedby="redundancy-addon"
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        Redundancy. How many copies of the file do you want to store.
                    </Form.Text>
                </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="dark" onClick={() => toggle(null)}>Close</Button>
            <StoreFileButton duration={duration} redundancy={redundancy} cid={file.cid} toggle={toggle}/>
        </Modal.Footer>
    </Modal>;
}

interface IRetrieveFileButtonProps {
    cid: string;
    duration: number;
    redundancy: number;
    toggle: Function;
}

export const StoreFileButton = ({cid, toggle, duration, redundancy}: IRetrieveFileButtonProps) => {
    const [progress, setProgress] = useState(false)
    const {addToast} = useToasts()

    const reset = () => {
        setProgress(false)
        toggle(null)
    }
    return <Button variant="primary" onClick={() => {
        setProgress(true);
        start(cid, duration, redundancy, () => {
            addToast('Storing...', {appearance: 'info'})
            service.reloadFiles()
            reset();
        }, (err: Error) => {
            addToast(err, {appearance: 'error'})
            reset();
        })
    }} disabled={progress}>
        <Image src={store_to_cloud} width={24}/> Store
    </Button>;
}
