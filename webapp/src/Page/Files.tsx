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

import React from "react";
import {Button, Container, Image, Table} from "react-bootstrap";
import download from "../_resources/icons/download.svg";
import download_from_cloud from "../_resources/icons/downloading-from-computing-cloud.svg";
import spinner from "../_resources/icons/spinner-of-dots.svg";
import upload_to_cloud from "../_resources/icons/up-arrow-and-cloud.svg";

enum FileStatus {
    OnServer = "OnServer",
    Downloading = "Downloading",
    Sealed = "Sealed",
    Staged = "Staged",
    Uploading = "Uploading",
    Downloaded = "Downloaded",
}

interface IFile {
    cid: string
    status: FileStatus
    miners: number
    price: number
    duration: number
    total: number
    size: number
}

interface IProps {
}

interface IState {
    files: IFile[];
}

export class FilesPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            files: [{
                cid: "basdasdfgfsdsgfagsdfhsdfasfgas",
                status: FileStatus.OnServer,
                miners: 0,
                price: 0,
                duration: 0,
                total: 0,
                size: 0,
            }]
        }
    }

    render() {
        return <Container fluid className="mt-4"><Table bordered hover>
            <thead className="bg-dark text-light">
            <tr>
                <th>CID</th>
                <th>Status</th>
                <th>Miners</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Total</th>
                <th>File Size</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {this.state.files.map(file => <tr>
                <td>{file.cid}</td>
                <td>{file.status}</td>
                <td>{file.miners}</td>
                <td>{file.price}</td>
                <td>{file.duration}</td>
                <td>{file.total}</td>
                <td>{file.size}</td>
                <td>{fileActions(file)}</td>
            </tr>)}
            </tbody>
        </Table></Container>;
    }
}

const fileActions = (file: IFile): JSX.Element => {
    let button = <span/>;
    switch (file.status) {
        case FileStatus.OnServer:
            button = <Button type="button" size="sm" variant="outline-secondary"><Image src={upload_to_cloud}
                                                                                        width={24}/></Button>
            break;
        case FileStatus.Downloading:
            button =
                <Button type="button" size="sm" variant="outline-secondary"><Image src={spinner} width={24}/></Button>
            break;
        case FileStatus.Sealed:
        case FileStatus.Staged:
            button = <Button type="button" size="sm" variant="outline-secondary"><Image src={download_from_cloud}
                                                                                        width={24}/></Button>
            break;
        case FileStatus.Uploading:
            button =
                <Button type="button" size="sm" variant="outline-secondary"><Image src={spinner} width={24}/></Button>
            break;
        case FileStatus.Downloaded:
            button =
                <Button type="button" size="sm" variant="outline-secondary"><Image src={download} width={24}/></Button>
            break;
    }

    return button
}
