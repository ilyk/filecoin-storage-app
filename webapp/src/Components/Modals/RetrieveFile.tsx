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

import {Button, Image, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {IFile} from "../../_models/File";
import download_from_cloud from "../../_resources/icons/downloading-from-computing-cloud.svg";
import {service} from "../../_service/backend";

interface IProps {
    file: IFile | null;
    toggle: Function;
    show: boolean;
}

function start(file: IFile,addToast:Function) {
    let err = service.startRetrieving(file.cid)
    if (err != null) {
        addToast(err, {
            appearance: 'error',
            autoDismiss: true,
        })
    } else {
        addToast("Done!", {
            appearance: 'info',
            autoDismiss: true,
        })
    }
}

export const RetrieveFileModal = ({file, toggle, show}: IProps) => {
    const [progress, setProgress] = useState(false)
    //const { addToast } = useToasts()
    const addToast = () => {}

    return null == file ? <span/> : <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
            <Modal.Title>Retrieve File...</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>You are about to retrieve file with CID:</p>
            <p>{file.cid}: ({file.size})</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="dark" onClick={() => toggle(null)}>Close</Button>
            <Button variant="primary" onClick={() => {
                setProgress(true);
                start(file, addToast)
            }} disabled={progress}>
                <Image src={download_from_cloud} width={24}/>
                Begin Retrieving
            </Button>
        </Modal.Footer>
    </Modal>
}
