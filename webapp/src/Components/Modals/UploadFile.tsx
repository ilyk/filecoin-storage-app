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
import {Button, Modal, ProgressBar} from "react-bootstrap";
import TusUploady, {useItemProgressListener} from "@rpldy/tus-uploady";
import UploadButton from "@rpldy/upload-button";

interface IProgressProps {
    onDone: Function
}

//must be rendered inside <Uploady>
const LogProgress = ({onDone}: IProgressProps) => {
    const [progress, setProgress] = useState(0)

    useItemProgressListener((item) => {
        setProgress(item.completed)
        if (item.completed === 100) {
            onDone()
        }
    });

    return <ProgressBar now={progress} label={`${progress}%`}/>;
}

interface IProps {
    toggle: Function;
    show: boolean;
}

export const UploadFileModal = ({toggle, show}: IProps) => {
    return <Modal show={show} onHide={() => toggle(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Upload file to the server...</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <TusUploady
                destination={{url: "http://localhost:8080/api/files/"}}
                autoUpload
                chunkSize={2142880}
                sendDataOnCreate>
                <UploadButton className="btn btn-primary"/>
                <LogProgress onDone={() => toggle(true)}/>
            </TusUploady>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="dark" onClick={() => toggle(false)}>Close</Button>
        </Modal.Footer>
    </Modal>
}
